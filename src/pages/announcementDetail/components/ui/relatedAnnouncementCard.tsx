import { Announcement } from "@/shared/types/general";
import React from "react";
import { Link } from "react-router-dom";
import {
	lowercaseifySentences,
	sanitizeAndHyphenate,
	sqlTimestampToDateVTwo,
	timeAgo,
} from "@/shared/lib/utils";
import Skeleton from "react-loading-skeleton";

type RelatedAnnouncementCardProps = {
	announcement: Announcement;
	loading: boolean;
};

const RelatedAnnouncementCard = ({
	announcement,
	loading,
}: RelatedAnnouncementCardProps): React.JSX.Element => {
	const formattedDate = sqlTimestampToDateVTwo(announcement?.created_at ?? "");
	const formattedAnnouncementTimeAgo = timeAgo(formattedDate ?? new Date());
	const announcementPublishDate = formattedDate?.toLocaleDateString("default", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});

	return (
		<li className="list-none snap-start !pr-8 !pb-8 !pt-4">
			<Link
				to={"/announcements/"
					.concat(lowercaseifySentences(sanitizeAndHyphenate(announcement?.title ?? "")))
					.concat(`?announcement_id=${encodeURIComponent(announcement?.announcement_id ?? "")}`)}
				className="w-full h-full cursor-pointer"
			>
				{loading ? (
					<Skeleton className="md:w-[400px] md:h-[200px]" />
				) : (
					<div className="custom-glass-card rounded-md relative overflow-hidden w-[300px] md:w-[400px] md:max-w-[400px]  max-w-[300px] h-[150px] md:h-[200px] sm:px-8 md:px-4 p-4 md:py-8">
						<div className="absolute inset-0 bottom-0 right-0 w-full h-full -z-10">
							<div className="absolute bottom-1 right-4 md:right-16 w-[70%] md:w-[40%] h-[40%] md:h-[52%] inset bg-white bg-[radial-gradient(#469646b8_1px,transparent_2px)] [background-size:16px_16px]"></div>
						</div>
						<div className="absolute inset-0 bottom-0 right-0 w-full h-full -z-10">
							<div className="absolute top-4 left-4 w-[60%] md:w-[20%] h-[20%] md:h-[20%] inset bg-white bg-[radial-gradient(#4c914cb8_1px,transparent_1px)] [background-size:16px_16px]"></div>
						</div>
						<div className="flex flex-col w-full h-full">
							<div className="flex gap-2">
								<p className="text-rgb-full text-sm">{announcementPublishDate}</p>
								<div className="flex justify-center items-center h-full">
									<span className="w-1 h-1 rounded-full bg-primary"></span>
								</div>
								<p className="text-rgb-full text-sm">{formattedAnnouncementTimeAgo}</p>
							</div>
							<div className="text-2xl font-xl text-rgb-full mt-4 mb-2">{announcement?.title}</div>
						</div>
					</div>
				)}
			</Link>
		</li>
	);
};

export default RelatedAnnouncementCard;
