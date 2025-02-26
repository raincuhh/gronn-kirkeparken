import clsx from "clsx";
import React from "react";

type DottedHorizontalRoundedIconProps = {
	className?: string;
};

const DottedHorizontalRoundedIcon = ({ className }: DottedHorizontalRoundedIconProps): React.JSX.Element => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={clsx("fill-text-normal h-6 w-6", className)}
				viewBox="0 0 24 24"
			>
				<path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
			</svg>
		</>
	);
};

export default DottedHorizontalRoundedIcon;
