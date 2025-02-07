import PageFooter from "@/widgets/pageFooter/components/ui/pageFooter";
import PageNavbar from "@/widgets/pageNavbar/components/ui/pageNavbar";
import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

type PageLayoutProps = PropsWithChildren;

const PageLayout = ({ children }: PageLayoutProps): React.JSX.Element => {
	const location = useLocation();

	const privateRoutes = ["/dashboard", "/upload"];
	const isPrivateRoute = privateRoutes.includes(location.pathname);

	return (
		<>
			<PageNavbar />
			<div className="min-h-dvh flex flex-col bg-primary">{children}</div>
			<PageFooter isPrivateRoute={isPrivateRoute} />
		</>
	);
};

export default PageLayout;
