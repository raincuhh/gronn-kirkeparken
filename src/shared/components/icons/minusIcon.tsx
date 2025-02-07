import React from "react";

type MinusIconProps = {
	className?: string;
};

const MinusIcon = ({ className }: MinusIconProps): React.JSX.Element => {
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
				<path d="M5 11h14v2H5z" />
			</svg>
		</>
	);
};

export default MinusIcon;
