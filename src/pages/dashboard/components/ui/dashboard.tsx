import React from "react";
import DashboardNavigationMenu from "./dashboardNavigationMenu";
import { useLocation } from "react-router-dom";
import DashboardProfile from "./dashboardProfile";
import DashboardPhotoApprovals from "./dashboardPhotoApprovals";
import DashboardAnnouncements from "./dashboardAnnouncements";
import DashboardPhotos from "./dashboardPhotos";

type PageHeader = {
	title: string;
	desc: string;
};

const pageData: Record<string, PageHeader> = {
	"/dashboard": { title: "Profil", desc: "Endre forskjellige profil instillinger." },
	"/dashboard/photos": { title: "Lagt ut bilder", desc: "Se dine ventende bilder." },
	"/dashboard/photo-approvals": { title: "Godkjenn bilder", desc: "Godkjenn bilde innlegg." },
	"/dashboard/announcements": {
		title: "Kunngjøringer",
		desc: "Legg til nye kunngjøringer, eller endre lagt ut kunngjøringer.",
	},
};

const Dashboard = (): React.JSX.Element => {
	const location = useLocation();
	const currentPage = pageData[location.pathname] || pageData["/dashboard"];

	return (
		<div id="dashboard" className="md:px-16 px-4 flex w-full mt-16 max-w-[1140px] mx-auto items-center">
			<div className="mt-16 flex flex-col sm:flex-row justify-between w-full">
				<DashboardNavigationMenu />
				<div className="sm:min-w-[70%] md:min-w-[65%] pt-4 sm:pt-0 sm:pl-4 flex flex-col ">
					{location.pathname === "/dashboard" ? (
						<DashboardProfile currentPageHeader={currentPage} />
					) : location.pathname === "/dashboard/photos" ? (
						<DashboardPhotos currentPageHeader={currentPage} />
					) : location.pathname === "/dashboard/photo-approvals" ? (
						<DashboardPhotoApprovals currentPageHeader={currentPage} />
					) : location.pathname === "/dashboard/announcements" ? (
						<DashboardAnnouncements currentPageHeader={currentPage} />
					) : (
						<DashboardProfile currentPageHeader={currentPage} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
