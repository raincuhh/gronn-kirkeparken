import React from "react";
import clsx from "clsx";

type UploadIconProps = {
	className?: string;
};

const UploadIcon = ({ className }: UploadIconProps): React.JSX.Element => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={clsx("fill-text-normal h-6 w-6", className)}
				viewBox="0 0 24 24"
			>
				<path d="M11 15h2V9h3l-4-5-4 5h3z" />
				<path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
			</svg>
		</>
	);
};

export default UploadIcon;
