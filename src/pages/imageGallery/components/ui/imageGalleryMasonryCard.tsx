import { Author, Photos } from "@/shared/types/general";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { getImageUrl } from "@/shared/lib/storage";
import ProfilePicture from "@/shared/components/ui/profilePicture";
import { useMediaQuery } from "react-responsive";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";

type ImageGalleryMasonryCardProps = {
	data: Photos & { author?: Author };
	loading: boolean;
};

const ImageGalleryMasonryCard = ({ data, loading }: ImageGalleryMasonryCardProps): React.JSX.Element => {
	const { open } = useModal();
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [publicUrl, setPublicUrl] = useState<string>("");
	const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

	const getPublicUrl = useCallback(() => {
		if (data?.img_url) {
			const publicUrl = getImageUrl(data.img_url);
			if (publicUrl) {
				setPublicUrl(publicUrl);

				let img = new Image();
				img.src = publicUrl;
				img.onload = () => {
					setImageSize({ width: img.width, height: img.height });
				};
			} else {
				console.error("No public URL available");
			}
		} else {
			console.error("Image URL is undefined");
		}
	}, [data?.img_url]);

	useEffect(() => {
		getPublicUrl();
	}, [getPublicUrl]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => document.body.classList.remove("overflow-hidden");
	}, [isOpen]);

	const modalContent = useMemo<Modal>(
		() => ({
			id: "fullscreen-view",
			content: (
				<div className="flex flex-col gap-4">
					<img src={publicUrl} alt={data?.caption ?? ""} className="aspect-video object-cover" />
					<p className="text-lg text-rgb-full font-lg">{data?.caption}</p>
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
		<li
			onClick={() => {
				handleOpenModal();
			}}
			className="break-inside-avoid !mb-4 min-h-16"
		>
			{loading || !imageSize ? (
				<Skeleton
					style={{
						width: "100%",
						height: imageSize ? `${imageSize.height}px` : "200px",
					}}
				/>
			) : (
				<div className="flex flex-col hover:bg-primary-alt group transition-colors duration-100 ease-in-out">
					<div className="relative rounded-md ease-in-out duration-100 transition-colors">
						<img src={publicUrl} alt={data?.caption ?? ""} className="w-full block rounded-md" />
						<div className="absolute w-full opacity-0 group-hover:opacity-100 h-full bg-modal-overlay top-0 left-0 rounded-md ease-in-out duration-100 transition-opacity px-4 py-4">
							<div className="flex flex-col h-full justify-between">
								<div className="overflow-y-auto">
									<p className="text-lg text-rgb-full font-lg">{data?.caption}</p>
								</div>
								<div className="flex gap-4">
									<ProfilePicture />
									<div className="flex gap-2 text-rgb-full transition-colors duration-100 ease-in-out">
										<p className="font-xl text-lg ">{data.author?.first_name}</p>
										<p className="font-xl text-lg ">{data.author?.last_name}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</li>
	);
};

export default ImageGalleryMasonryCard;
