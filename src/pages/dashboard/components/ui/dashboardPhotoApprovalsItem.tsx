import { Photos } from "@/shared/types/general";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { getPublicImageUrl } from "@/shared/lib/storage";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";
import Button from "@/shared/components/ui/button";

type DashboardPhotoApprovalsItemProps = {
	photo: Photos;
	loading: boolean;
};

const DashboardPhotoApprovalsItem = ({
	photo,
	loading,
}: DashboardPhotoApprovalsItemProps): React.JSX.Element => {
	const { open } = useModal();
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const [isOpen, setIsOpen] = useState(false);

	const publicUrl = useMemo(() => (photo?.img_url ? getPublicImageUrl(photo) : ""), [photo?.img_url]);

	useEffect(() => {
		document.body.classList.toggle("overflow-hidden", isOpen);
		return () => document.body.classList.remove("overflow-hidden");
	}, [isOpen]);

	const modalContent = useMemo<Modal>(
		() => ({
			id: "fullscreen-view",
			content: (
				<div className="flex flex-col gap-4">
					<img src={publicUrl} alt={photo?.caption ?? ""} className="aspect-video object-cover" />
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
		open(modalContent);
	}, [open, modalContent]);

	return (
		<>
			{loading ? (
				<Skeleton height={"2rem"} />
			) : (
				<>
					<li className="flex w-full justify-between items-center gap-4 !pb-4 border-b border-modifier-border-color">
						<div className="flex gap-4 items-center">
							<Thumbnail
								imageUrl={publicUrl}
								caption={photo?.caption ?? ""}
								onClick={handleOpenModal}
							/>
							<p className="max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis hidden font-lg text-md lg:block">
								{photo?.caption}
							</p>
						</div>
						<div className="flex gap-6 items-center">
							<span className="text-text-muted truncate text-md font-lg">{photo?.status}</span>
							<ApprovalButtons />
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

const ApprovalButtons = () => (
	<div className="flex gap-4">
		<Button variant="success" className="w-[80px]">
			Godkjenn
		</Button>
		<Button variant="destructive" className="w-[80px]">
			Avvis
		</Button>
	</div>
);
