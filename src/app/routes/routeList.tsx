import { Navigate } from "react-router-dom";
// import { lazy } from "react";
import { RouteListProps, RouteTypes } from "@/shared/types/routing";
import HomePage from "@/pages/home/components/ui/homePage";
import AnnouncementsPage from "@/pages/announcements/components/ui/announcementsPage";
import NotFoundPage from "@/pages/notFound/components/ui/notFoundPage";
import LoginPage from "@/pages/login/components/ui/loginPage";
import RegisterPage from "@/pages/register/components/ui/registerPage";
import AnnouncementDetailPage from "@/pages/announcementDetail/components/ui/announcementDetailPage";
import DashboardPage from "@/pages/dashboard/components/ui/dashboardPage";

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
		id: "approvals",
		url: "/dashboard/photo-approvals",
		element: <></>,
		type: RouteTypes.private,
	},
	{
		id: "announcements",
		url: "/dashboard/announcements",
		element: <></>,
		type: RouteTypes.private,
	},
];

export default RouteList;
