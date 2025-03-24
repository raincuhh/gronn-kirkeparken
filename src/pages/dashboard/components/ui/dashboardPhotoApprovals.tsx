import React from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";

type DashboardPhotoApprovalsProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardPhotoApprovals = ({ currentPageHeader }: DashboardPhotoApprovalsProps): React.JSX.Element => {
	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
		</div>
	);
};

export default DashboardPhotoApprovals;
