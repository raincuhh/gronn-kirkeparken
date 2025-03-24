import React from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";

type DashboardProfileProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardProfile = ({ currentPageHeader }: DashboardProfileProps): React.JSX.Element => {
	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
		</div>
	);
};

export default DashboardProfile;
