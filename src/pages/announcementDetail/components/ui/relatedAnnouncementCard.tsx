import { Announcement } from "@/pages/home/components/ui/homeAnnouncementPreview";
import React from "react";

type RelatedAnnouncementCardProps = {
	announcement: Announcement;
};

const RelatedAnnouncementCard = ({ announcement }: RelatedAnnouncementCardProps): React.JSX.Element => {
	return <li>{announcement.title}</li>;
};

export default RelatedAnnouncementCard;
