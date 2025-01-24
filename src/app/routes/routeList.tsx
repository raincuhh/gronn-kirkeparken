import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { RouteListProps, RouteTypes } from "../../shared/types/routing";

const RouteList: RouteListProps[] = [
	{
		id: "not-found",
		url: "/404",
		element: <>not found </>,
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
		element: <></>,
		type: RouteTypes.public,
	},
	{
		id: "announcements",
		url: "/announcements",
		element: <></>,
		type: RouteTypes.public,
	},
	{
		id: "login",
		url: "/login",
		element: <>login</>,
		type: RouteTypes.public,
	},
	{
		id: "register",
		url: "/register",
		element: <>register</>,
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
