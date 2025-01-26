import React from "react";

const HomeHero = (): React.JSX.Element => {
	return (
		<div className="relative h-[70vh] pt-16 overflow-hidden">
			<img
				className="absolute w-full h-full object-cover"
				src="/assets/images/placeholder1920x1080.png"
				alt="heroBanner"
			/>
		</div>
	);
};

export default HomeHero;
