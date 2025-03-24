import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { RouteListProps, RouteTypes } from "@/shared/types/routing";
import HomePage from "@/pages/home/components/ui/homePage";

const AnnouncementsPage = lazy(() => import("@/pages/announcements/components/ui/announcementsPage"));
const NotFoundPage = lazy(() => import("@/pages/notFound/components/ui/notFoundPage"));
const LoginPage = lazy(() => import("@/pages/login/components/ui/loginPage"));
const RegisterPage = lazy(() => import("@/pages/register/components/ui/registerPage"));
const AnnouncementDetailPage = lazy(
	() => import("@/pages/announcementDetail/components/ui/announcementDetailPage")
);
const DashboardPage = lazy(() => import("@/pages/dashboard/components/ui/dashboardPage"));
const ImageGalleryPage = lazy(() => import("@/pages/imageGallery/components/ui/imageGalleryPage"));
const UnauthorizedPage = lazy(() => import("@/pages/unauthorized/components/ui/unauthorizedPage"));

const RouteList: RouteListProps[] = [
	{
		url: "/",
		element: <Navigate to="/home" replace={true} />,
		type: RouteTypes.public,
	},
	{
		id: "not-found",
		url: "/404",
		element: <NotFoundPage />,
		type: RouteTypes.public,
	},
	{
		id: "unauthorized",
		url: "/401",
		element: <UnauthorizedPage />,
		type: RouteTypes.public,
	},
	{
		url: "*",
		element: <Navigate to={"/404"} replace={true} />,
		type: RouteTypes.public,
	},
	{
		id: "home",
		url: "/home",
		element: <HomePage />,
		type: RouteTypes.public,
	},
	{
		id: "announcements",
		url: "/announcements",
		element: <AnnouncementsPage />,
		type: RouteTypes.public,
	},
	{
		id: "announcement-detail",
		url: "/announcements/:id",
		element: <AnnouncementDetailPage />,
		type: RouteTypes.public,
	},
	{
		id: "image-gallery",
		url: "/image-gallery",
		element: <ImageGalleryPage />,
		type: RouteTypes.public,
	},
	{
		id: "login",
		url: "/login",
		element: <LoginPage />,
		type: RouteTypes.auth,
	},
	{
		id: "register",
		url: "/register",
		element: <RegisterPage />,
		type: RouteTypes.auth,
	},
	{
		id: "dashboard",
		url: "/dashboard",
		element: <DashboardPage />,
		type: RouteTypes.protected,
	},
	{
		id: "dashboard",
		url: "/dashboard/photos",
		element: <DashboardPage />,
		type: RouteTypes.protected,
	},
	{
		id: "approvals",
		url: "/dashboard/photo-approvals",
		element: <DashboardPage />,
		type: RouteTypes.private,
	},
	{
		id: "announcement-posting",
		url: "/dashboard/announcements",
		element: <DashboardPage />,
		type: RouteTypes.private,
	},
];

export default RouteList;
