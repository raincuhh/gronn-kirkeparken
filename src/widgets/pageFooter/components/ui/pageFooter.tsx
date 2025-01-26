import React from "react";
import clsx from "clsx";

type PageFooterProps = { isPrivateRoute: boolean };

const PageFooter = ({ isPrivateRoute }: PageFooterProps): React.JSX.Element => {
	return (
		<footer className={clsx("w-full pb-8", isPrivateRoute ? "" : "")}>
			<div>foooter</div>
		</footer>
	);
};

export default PageFooter;
