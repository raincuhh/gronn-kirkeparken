import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/shared/lib/services";
// import { formatTextWithLineBreaks, sqlTimestampToDateVTwo } from "@/shared/lib/utils";
// import DOMPurify from "dompurify";
import { Announcement } from "@/pages/home/components/ui/homeAnnouncementPreview";
import RenderList from "@/shared/components/utils/renderList";
import RelatedAnnouncementCard from "./relatedAnnouncementCard";

const RelatedAnnouncements = (): React.JSX.Element => {
	const [searchParams] = useSearchParams();
	const announcementId = searchParams.get("announcement_id");
	const [relatedAnnouncementsData, setRelatedAnnouncementsData] = useState<Announcement[]>([]);
	// const [relatedAnnouncementsError, setRelatedAnnouncementsError] = useState<any>(null);
	// const [loading, setLoading] = useState<boolean>(true);

	const fetchRelatedAnnouncements = async () => {
		// setLoading(true);
		// setRelatedAnnouncementsError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("title, preview_text, created_at, user_id")
			.neq("announcement_id", announcementId)
			.order("created_at", { ascending: false })
			.limit(6);

		if (error) {
			console.error("Error fetching related announcements:", error);
			// setRelatedAnnouncementsError(error);
			setRelatedAnnouncementsData([]);
			return;
		} else {
			setRelatedAnnouncementsData(data || []);
		}

		// setLoading(false);
	};

	useEffect(() => {
		fetchRelatedAnnouncements();
	}, []);

	return (
		<div className="flex flex-col w-full mt-[6rem]">
			<div className="md:px-16 px-4 w-full flex flex-col max-w-[1020px] mx-auto">
				<h1 className="text-3xl font-xl">Siste kunngjøringer</h1>
				<div className="relative">
					<ul className="flex flex-row overflow-hidden flex-nowrap">
						<RenderList
							data={relatedAnnouncementsData}
							render={(data: Announcement, i: number) => (
								<RelatedAnnouncementCard key={i} announcement={data} />
							)}
						/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default RelatedAnnouncements;
