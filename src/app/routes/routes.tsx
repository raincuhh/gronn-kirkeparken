import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteList from "./routeList";
import ErrorBoundary from "@/shared/components/utils/errorBoundary";
import { RouteListProps } from "@/shared/types/routing";
import RouteGuard from "@/features/auth/components/utils/routeGuard";
import PageLayout from "@/shared/components/layouts/pageLayout";
import ScrollToTop from "@/shared/components/utils/scrollToTop";

const websiteRouter = createBrowserRouter(
	createRoutesFromElements(
		RouteList.map((route: RouteListProps, i: number) => {
			return (
				<Route
					key={i}
					path={route.url}
					element={
						<RouteGuard>
							<ScrollToTop />
							<PageLayout>{route.element}</PageLayout>
						</RouteGuard>
					}
					errorElement={
						route.errorElement || (
							<ErrorBoundary fallback={"An error has occurred, check DevTools for more details."} />
						)
					}
				/>
			);
		})
	)
);

export default websiteRouter;
