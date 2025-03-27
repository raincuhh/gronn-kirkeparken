import React, { useCallback, useEffect, useState, useMemo } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { Photos, PhotoStatus } from "@/shared/types/general";
import { supabase } from "@/shared/lib/services";
import Button from "@/shared/components/ui/button";
import Skeleton from "react-loading-skeleton";
import useAuth from "@/features/auth/hooks/useAuth";
import RenderList from "@/shared/components/utils/renderList";
import { getPublicImageUrl } from "@/shared/lib/storage";
import Thumbnail from "@/shared/components/ui/thumbnail";

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

const DashboardPhotosList = ({
	header,
	categorizedPhotos,
	loading,
}: DashboardPhotosListProps): React.JSX.Element => {
	return (
		<div className="flex flex-col gap-2">
			<header className="text-xl font-xl border-solid pb-2 mb-2 border-modifier-border-color border-b-[1px]">
				{header}
			</header>
			<ul className="columns-1 sm:columns-2 md:columns-3 gap-4">
				<RenderList
					data={categorizedPhotos}
					render={(item: Photos, i: number) => (
						<DashboardPhotoItem photo={item} key={i} loading={loading} />
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

const DashboardPhotoItem = ({ photo, loading }: DashboardPhotoItemProps): React.JSX.Element => {
	const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

	const publicUrl = useMemo(() => (photo?.img_url ? getPublicImageUrl(photo) : ""), [photo?.img_url]);

	useEffect(() => {
		if (!publicUrl) return;

		const img: HTMLImageElement = new Image();
		img.src = publicUrl;
		img.onload = () => setImageSize({ width: img.width, height: img.height });
	}, [publicUrl]);

	return (
		<li className="break-inside-avoid !mb-4 min-h-16">
			{loading ? (
				<Skeleton
					style={{
						width: "100%",
						height: imageSize ? `${imageSize.height}px` : "200px",
					}}
				/>
			) : (
				<>
					<div className="flex flex-col hover:bg-primary-alt transition-colors duration-100 ease-in-out">
						<Thumbnail photo={photo} caption={photo.caption ?? ""} />
					</div>
				</>
			)}
		</li>
	);
};
