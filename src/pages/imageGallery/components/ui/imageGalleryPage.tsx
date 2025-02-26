import React from "react";
import ImageGalleryFeed from "./imageGalleryFeed";
import ImageGalleryHeader from "./imageGalleryHeader";

const ImageGalleryPage = (): React.JSX.Element => {
	return (
		<>
			<ImageGalleryHeader />
			<ImageGalleryFeed />
		</>
	);
};

export default ImageGalleryPage;
