import { Photos } from "@/shared/types/general";
import React from "react";
import Skeleton from "react-loading-skeleton";

type DashboardPhotoApprovalsItemProps = {
	photo: Photos;
	loading: boolean;
};

const DashboardPhotoApprovalsItem = ({
	photo,
	loading,
}: DashboardPhotoApprovalsItemProps): React.JSX.Element => {
	return (
		<>
			{loading ? (
				<Skeleton height={"2rem"} />
			) : (
				<>
					<li>{photo.caption}</li>
				</>
			)}
		</>
	);
};

export default DashboardPhotoApprovalsItem;
