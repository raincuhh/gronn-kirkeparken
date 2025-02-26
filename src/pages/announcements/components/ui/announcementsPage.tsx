import React from "react";
import AnnouncementsList from "./announcementsList";
import AnnouncementsHeader from "./announcementsHeader";

const AnnouncementsPage = (): React.JSX.Element => {
	return (
		<>
			<AnnouncementsHeader />
			<AnnouncementsList />
		</>
	);
};

export default AnnouncementsPage;
