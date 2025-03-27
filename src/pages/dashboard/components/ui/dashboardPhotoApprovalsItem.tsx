import { Photos } from "@/shared/types/general";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { getPublicImageUrl } from "@/shared/lib/storage";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";
import Button from "@/shared/components/ui/button";
import { photoStatusToNo } from "@/shared/lib/utils";
import { supabase } from "@/shared/lib/services";

type DashboardPhotoApprovalsItemProps = {
	photo: Photos;
	loading: boolean;
	onUpdate: () => void;
};

const DashboardPhotoApprovalsItem = ({
	photo,
	loading,
	onUpdate,
}: DashboardPhotoApprovalsItemProps): React.JSX.Element => {
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
							<ApprovalButtons photoId={photo?.photo_id ?? ""} onUpdate={onUpdate} />
						</div>
					</li>
				</>
			)}
		</>
	);
};

export default DashboardPhotoApprovalsItem;

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

type ApprovalButtonsProps = {
	photoId: string | null;
	onUpdate: () => void;
};

const ApprovalButtons = ({ photoId, onUpdate }: ApprovalButtonsProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleUpdateStatus = async (status: "approved" | "rejected") => {
		try {
			setLoading(true);
			setError(null);

			if (photoId === null) {
				throw new Error("Kunne ikke hente bilde Id.");
			}

			const { error } = await supabase.from("photos").update({ status }).eq("photo_id", photoId);

			if (error) {
				throw new Error("Noe gikk feil, prøv igjen.");
			}

			onUpdate();
		} catch (err: any) {
			console.error(err?.message);
			setError(err?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex gap-4 md:flex-row flex-col">
			<Button
				variant="success"
				className="w-[80px]"
				onClick={() => handleUpdateStatus("approved")}
				disabled={loading}
			>
				{loading ? "prosesser..." : "Godkjenn"}
			</Button>
			<Button
				variant="destructive"
				className="w-[80px]"
				onClick={() => handleUpdateStatus("rejected")}
				disabled={loading}
			>
				{loading ? "prosesser..." : "Avvis"}
			</Button>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};
