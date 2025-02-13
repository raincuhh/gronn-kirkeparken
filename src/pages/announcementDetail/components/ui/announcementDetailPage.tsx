import React from "react";
import AnnouncementReaderView from "./announcementReaderView";
import RelatedAnnouncements from "./relatedAnnouncements";

const AnnouncementDetailPage = (): React.JSX.Element => {
	return (
		<>
			<AnnouncementReaderView />
			<RelatedAnnouncements />
		</>
	);
};

export default AnnouncementDetailPage;
