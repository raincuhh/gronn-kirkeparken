import { Navigate } from "react-router-dom";
// import { lazy } from "react";
import { RouteListProps, RouteTypes } from "@/shared/types/routing";
import HomePage from "@/pages/home/components/ui/homePage";
import AnnouncementsPage from "@/pages/announcements/components/ui/announcementsPage";
import NotFoundPage from "@/pages/notFound/components/ui/notFoundPage";
import LoginPage from "@/pages/login/components/ui/loginPage";
import RegisterPage from "@/pages/register/components/ui/registerPage";
import AnnouncementDetailPage from "@/pages/announcementDetail/components/ui/announcementDetailPage";

const RouteList: RouteListProps[] = [
	{
		id: "root",
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
		id: "all",
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
		type: RouteTypes.public,
	},
	{
		id: "register",
		url: "/register",
		element: <RegisterPage />,
		type: RouteTypes.public,
	},
	{
		id: "",
		url: "",
		element: <></>,
		type: RouteTypes.public,
	},
];

export default RouteList;
