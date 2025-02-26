import React from "react";
import ImageGalleryImages from "./imageGalleryImages";

type ImageGalleryFeedProps = {};

const ImageGalleryFeed = ({}: ImageGalleryFeedProps): React.JSX.Element => {
	return (
		<div id="image-gallery-feed" className="md:px-16 px-4 flex w-full max-w-[1140px] mx-auto items-center">
			<div className="flex flex-col w-full">
				<ImageGalleryImages />
			</div>
		</div>
	);
};

export default ImageGalleryFeed;
