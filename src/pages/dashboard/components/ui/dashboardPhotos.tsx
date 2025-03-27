import React, { useCallback, useEffect, useState, useMemo } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { Photos, PhotoStatus } from "@/shared/types/general";
import { supabase } from "@/shared/lib/services";
import Button from "@/shared/components/ui/button";
import Skeleton from "react-loading-skeleton";
import useAuth from "@/features/auth/hooks/useAuth";
import RenderList from "@/shared/components/utils/renderList";
import useModal from "@/shared/hooks/useModal";
import { useMediaQuery } from "react-responsive";
import { getPublicImageUrl } from "@/shared/lib/storage";
import { Modal } from "@/shared/types/modal";
import { photoStatusToNo } from "@/shared/lib/utils";

type DashboardPhotosProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardPhotos = ({ currentPageHeader }: DashboardPhotosProps): React.JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [photos, setPhotos] = useState<Photos[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { session } = useAuth();

	const [loadingSession, setLoadingSession] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const { data: sessionData, error } = await supabase.auth.getSession();
			if (sessionData) {
				setLoadingSession(false);
			} else {
				console.error("No session found.", error);
				setLoadingSession(false);
			}
		};

		fetchSession();
	}, []);

	const fetchPhotos = useCallback(async () => {
		if (!session?.user) {
			console.error("No session available.");
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const userId = session.user.id;
			const { data, error: photosError } = await supabase.from("photos").select("*").eq("user_id", userId);

			if (photosError) throw new Error("Kunne ikke laste inn bilder.");

			setPhotos(data ?? []);
		} catch (err: any) {
			console.error(err?.message);
			setError(err?.message);
			setPhotos([]);
		} finally {
			setLoading(false);
		}
	}, [session]);

	useEffect(() => {
		if (!loadingSession && session?.user) {
			fetchPhotos();
		}
	}, [fetchPhotos, session, loadingSession]);

	const categorizedPhotos = useMemo(() => {
		const pending = photos.filter((photo) => photo.status === PhotoStatus.pending);
		const rejected = photos.filter((photo) => photo.status === PhotoStatus.rejected);
		const approved = photos.filter((photo) => photo.status === PhotoStatus.approved);

		return [pending, rejected, approved];
	}, [photos]);

	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
			{loading ? (
				<div className="flex w-full flex-col gap-4 mt-4">
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} width={"80%"} />
					<Skeleton height={"2rem"} width={"40%"} />
				</div>
			) : error ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4 px-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{error}</p>
					<Button
						onClick={fetchPhotos}
						variant={"outline"}
						size={"md"}
						rounded={"full"}
						className="font-xl"
					>
						Prøv igjen
					</Button>
				</div>
			) : categorizedPhotos.length > 0 ? (
				<div className="flex flex-col gap-4">
					{categorizedPhotos[0].length > 0 ? (
						<DashboardPhotosList
							header="venter"
							categorizedPhotos={categorizedPhotos[0]}
							loading={loading}
						/>
					) : null}
					{categorizedPhotos[2].length > 0 ? (
						<DashboardPhotosList
							header="godkjent"
							categorizedPhotos={categorizedPhotos[2]}
							loading={loading}
						/>
					) : null}
					{categorizedPhotos[1].length > 0 ? (
						<DashboardPhotosList
							header="avvist"
							categorizedPhotos={categorizedPhotos[1]}
							loading={loading}
						/>
					) : null}
				</div>
			) : (
				<>
					<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-y border-x flex items-center justify-center">
						<p className="font-xl text-2xl">Ingen bilder funnet.</p>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardPhotos;

type DashboardPhotosListProps = {
	header: string;
	categorizedPhotos: Photos[];
	loading: boolean;
};

const DashboardPhotosList = ({ header, categorizedPhotos, loading }: DashboardPhotosListProps) => {
	return (
		<div className="flex flex-col gap-2">
			<header className="text-xl font-xl border-solid pb-2 mb-2 border-modifier-border-color border-b-[1px]">
				{header}
			</header>
			<ul className="flex flex-col">
				<RenderList
					data={categorizedPhotos}
					render={(item: Photos, i: number) => (
						<DashboardPhotosItem photo={item} key={i} loading={loading} />
					)}
				/>
			</ul>
		</div>
	);
};

type DashboardPhotoItemProps = {
	photo: Photos;
	loading: boolean;
};

const DashboardPhotosItem = ({ photo, loading }: DashboardPhotoItemProps) => {
	const { open } = useModal();
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const publicUrl = useMemo(() => (photo?.img_url ? getPublicImageUrl(photo) : ""), [photo?.img_url]);

	useEffect(() => {
		document.body.classList.toggle("overflow-hidden", isOpen);
		return () => document.body.classList.remove("overflow-hidden");
	}, [isOpen]);

	const modalContent = useMemo<Modal>(
		() => ({
			id: "fullscreen-view",
			content: (
				<div className="flex flex-col gap-4 !px-2">
					<img src={publicUrl} alt={photo?.caption ?? ""} className="object-cover max-h-[calc(80vh)]" />
					<p className="text-lg text-rgb-full font-lg">{photo?.caption}</p>
				</div>
			),
			size: "custom",
			justify: "center",
			className: "max-w-xl bg-transparent",
			onClose: () => setIsOpen(false),
		}),
		[isOverMd]
	);

	const handleOpenModal = useCallback(() => {
		setIsOpen(true);
		setTimeout(() => open(modalContent), 0);
	}, [open, modalContent]);

	return (
		<>
			{loading ? (
				<Skeleton height={"2rem"} />
			) : (
				<>
					<li className="flex w-full justify-between items-center gap-4 !py-2 !px-4 hover:bg-primary-alt rounded-md transition-colors duration-100 ease-in-out">
						<div className="flex gap-4 items-center">
							<Thumbnail
								imageUrl={publicUrl}
								caption={photo?.caption ?? ""}
								onClick={handleOpenModal}
							/>
							<p className="max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis hidden font-lg text-md lg:block">
								{photo?.caption}
							</p>
						</div>
						<div className="flex gap-4 md:gap-6 items-center">
							<span className="text-text-muted truncate text-md font-lg max-w-[55px] md:max-w-[75px]">
								{photoStatusToNo(photo?.status)}
							</span>
						</div>
					</li>
				</>
			)}
		</>
	);
};

type ThumbnailProps = {
	imageUrl: string;
	caption?: string;
	onClick: () => void;
};

const Thumbnail = ({ imageUrl, caption, onClick }: ThumbnailProps) => (
	<div className="relative group cursor-pointer" onClick={onClick}>
		<div className="w-32 h-16 overflow-hidden rounded-md">
			<img src={imageUrl} alt={caption ?? ""} className="w-full h-full object-cover" />
		</div>
		<div className="absolute inset-0 bg-modal-overlay rounded-md bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rgb-full text-md transition-opacity">
			Se full
		</div>
	</div>
);
