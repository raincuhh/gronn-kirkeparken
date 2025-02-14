import React from "react";
import Skeleton from "react-loading-skeleton";

const getRandomSize = () => {
	const widths = ["15%", "25%", "40%", "50%", "66%", "80%", "100%"];
	const heights = ["1rem", "1.5rem", "2rem"];

	return {
		width: widths[Math.floor(Math.random() * widths.length)],
		height: heights[Math.floor(Math.random() * heights.length)],
	};
};

const RandomSkeletonLoader = (): React.JSX.Element => {
	return (
		<div className="flex flex-col gap-4 w-full">
			{[...Array(Math.floor(Math.random() * 12) + 1)].map((_, index) => {
				const { width, height } = getRandomSize();
				return <Skeleton key={index} height={height} width={width} />;
			})}
		</div>
	);
};

export default RandomSkeletonLoader;
