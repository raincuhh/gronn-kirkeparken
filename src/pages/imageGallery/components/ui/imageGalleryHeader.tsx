import DottedHorizontalRoundedIcon from "@/shared/components/icons/dottedHorizontalRoundedIcon";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";
import React, { useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

const ImageGalleryHeader = (): React.JSX.Element => {
	const { open } = useModal();
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });

	const modalContent = useMemo<Modal>(
		() => ({
			id: "upload-image-to-image-gallery",
			content: (
				<div className="flex flex-col min-w-92 lg:min-w-112 min-h-128">
					<header className=""></header>
				</div>
			),
			size: "custom",
			justify: isOverMd ? "right" : "center",
			align: isOverMd ? "right" : "bottom",
			className: isOverMd
				? "h-full border-l rounded-tl-md rounded-bl-md"
				: "w-full border-t rounded-tl-md rounded-tr-md",
		}),
		[isOverMd]
	);

	const handleOpenModal = useCallback(() => {
		open(modalContent);
	}, [open, modalContent]);

	return (
		<header
			id="image-gallery-header"
			className=" flex w-full mt-16 items-center border-solid border-modifier-border-color border-b"
		>
			<div className=" w-full md:px-16 px-4 max-w-[1140px] mx-auto min-h-48 flex gap-4 md:gap-12 justify-between items-center">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl md:text-3xl font-xl">Bildegalleri</h1>
					<p className="text-text-muted text-md md:text-lg font-lg">
						Bla gjennom de nyeste bildene fra Grønn Kirkeparken, delt av fellesskapet. Har du et bilde å
						dele? Last opp et bilde med en beskrivelse og bidra til galleriet!
					</p>
				</div>
				<div>
					<div
						onClick={handleOpenModal}
						className="p-1 flex justify-center items-center rounded-md border-solid border-[1px] border-modifier-border-color hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default"
					>
						<DottedHorizontalRoundedIcon />
					</div>
				</div>
			</div>
		</header>
	);
};

export default ImageGalleryHeader;
