import React from "react";
import DashboardNavigationMenu from "./dashboardNavigationMenu";
import { useLocation } from "react-router-dom";
import DashboardProfile from "./dashboardProfile";
import DashboardPhotoApprovals from "./dashboardPhotoApprovals";
import DashboardAnnouncements from "./dashboardAnnouncements";

const currentDashboardPageData = [
	{ title: "Profil", desc: "Endre forskjellige profil instillinger." },
	{ title: "Godkjenn Bilder", desc: "Godkjenn forskjellige bilde innlegg." },
	{ title: "Kunngjøringer", desc: "Legg till nye kunngjøringer, eller endre lagt utt kunngjøringer." },
];

const Dashboard = (): React.JSX.Element => {
	const location = useLocation();

	const CurrentDashboardPage = () => {
		console.log(location.pathname);
		switch (location.pathname) {
			case "/dashboard":
				return <DashboardProfile currentPageHeader={currentDashboardPageData[0]} />;
			case "/dashboard/photo-approvals":
				return <DashboardPhotoApprovals currentPageHeader={currentDashboardPageData[1]} />;
			case "/dashboard/announcements":
				return <DashboardAnnouncements currentPageHeader={currentDashboardPageData[2]} />;
			default:
				return <DashboardProfile currentPageHeader={currentDashboardPageData[0]} />;
		}
	};

	return (
		<div id="dashboard" className="md:px-16 px-4 flex w-full mt-16 max-w-[1140px] mx-auto items-center">
			<div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between w-full">
				<DashboardNavigationMenu />
				<div className="sm:min-w-[70%] md:min-w-[65%] flex flex-col ">
					<CurrentDashboardPage />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
