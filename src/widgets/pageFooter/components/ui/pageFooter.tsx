import React from "react";
import clsx from "clsx";

type PageFooterProps = { isPrivateRoute: boolean };

const PageFooter = ({ isPrivateRoute }: PageFooterProps): React.JSX.Element => {
	return (
		<footer
			className={clsx(
				"md:px-16 px-4 flex flex-row justify-between w-full max-w-[1440px] mx-auto items-center",
				isPrivateRoute ? "" : ""
			)}
		>
			<div>foooter</div>
		</footer>
	);
};

export default PageFooter;
