import React from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";

type DashboardAnnouncementsProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardAnnouncements = ({ currentPageHeader }: DashboardAnnouncementsProps): React.JSX.Element => {
	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
		</div>
	);
};

export default DashboardAnnouncements;
