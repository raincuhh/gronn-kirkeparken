import React, { useCallback, useEffect, useState, useMemo } from "react";
import useModal from "@/shared/hooks/useModal";
import { useMediaQuery } from "react-responsive";
import { getPublicImageUrl } from "@/shared/lib/storage";
import { Modal } from "@/shared/types/modal";
import { Photos } from "@/shared/types/general";

type ThumbnailProps = {
	photo: Photos;
	caption?: string;
};

const Thumbnail = ({ photo, caption }: ThumbnailProps): React.JSX.Element => {
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
		open(modalContent);
	}, [open, modalContent]);

	return (
		<div className="relative group cursor-pointer" onClick={handleOpenModal}>
			<div className="overflow-hidden rounded-md ease-in-out duration-100 transition-colors">
				<img src={publicUrl} alt={caption ?? ""} className="w-full block rounded-md object-cover" />
			</div>
			<div className="absolute inset-0 bg-modal-overlay rounded-md bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rgb-full text-md transition-opacity">
				Se full
			</div>
		</div>
	);
};

export default Thumbnail;
