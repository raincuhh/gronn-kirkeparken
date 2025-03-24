import React from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";

type DashboardPhotosProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardPhotos = ({ currentPageHeader }: DashboardPhotosProps): React.JSX.Element => {
	return (
		<div className="flex flex-col">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
		</div>
	);
};

export default DashboardPhotos;
