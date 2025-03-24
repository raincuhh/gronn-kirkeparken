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
	const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

	const publicUrl = useMemo(() => (photo?.img_url ? getPublicImageUrl(photo) : ""), [photo?.img_url]);

	useEffect(() => {
		if (!publicUrl) return;

		const img: HTMLImageElement = new Image();
		img.src = publicUrl;
		img.onload = () => setImageSize({ width: img.width, height: img.height });
	}, [publicUrl]);

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
					<li className="flex w-full justify-between">
						<div className="flex gap-4">
							<div
								onClick={() => {
									handleOpenModal();
								}}
								className="relative group ease-in-out duration-100 transition-colors"
							>
								<div className="object-cover min-w-32 max-w-32 min-h-16 max-h-16 overflow-hidden rounded-md group-hover:">
									<img
										src={publicUrl}
										alt={photo?.caption ?? ""}
										className="aspect-video object-cover"
									/>
								</div>
								<div className="rounded-md cursor-pointer absolute w-full opacity-0 group-hover:opacity-100 h-full bg-modal-overlay top-0 left-0 ease-in-out duration-100 transition-colors">
									<div className="flex w-full h-full justify-center items-center text-rgb-full">
										Se full
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<p className="max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis">
									{photo.caption}
								</p>
							</div>
						</div>
						<div className="flex gap-8 items-center">
							<div>
								<Button
									variant={"outline"}
									size={"sm"}
									className="w-[100px] overflow-hidden whitespace-nowrap text-ellipsis"
								>
									{photo?.status}
								</Button>
							</div>
							<div className="flex gap-4">
								<Button variant={"success"}>Godkjenn</Button>
								<Button variant={"destructive"}>Avvis</Button>
							</div>
						</div>
					</li>
				</>
			)}
		</>
	);
};

export default DashboardPhotoApprovalsItem;
