import React from "react";
import { Link } from "react-router-dom";

type HomeAnnouncementPreviewProps = {
	info: string[];
};

const HomeAnnouncementPreview = ({ info }: HomeAnnouncementPreviewProps): React.JSX.Element => {
	return (
		<Link to={"/announcements"} className="w-full h-full">
			<div className="custom-glass-card p-4 min-h-[6rem]">{info}</div>
		</Link>
	);
};

export default HomeAnnouncementPreview;
