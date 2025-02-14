import { Announcement } from "@/shared/types/general";
import React from "react";
import { Link } from "react-router-dom";
import {
	lowercaseifySentences,
	sanitizeAndHyphenate,
	sqlTimestampToDateVTwo,
	timeAgo,
} from "@/shared/lib/utils";

type RelatedAnnouncementCardProps = {
	announcement: Announcement;
	loading: boolean;
};
// make a skeleton loader later or sum
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
				<div className="custom-glass-card rounded-md relative overflow-hidden md:min-w-[400px] md:min-h-[200px] min-w-[300px] min-h-[150px] h-full">
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full -z-10">
						<div className="absolute bottom-1 right-4 md:right-16 w-[70%] md:w-[40%] h-[40%] md:h-[52%] inset bg-white bg-[radial-gradient(#469646b8_1px,transparent_2px)] [background-size:16px_16px]"></div>
					</div>
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full hidden md:block -z-10">
						<div className="absolute top-4 left-4 w-[60%] md:w-[20%] h-[20%] md:h-[20%] inset bg-white bg-[radial-gradient(#4c914cb8_1px,transparent_1px)] [background-size:16px_16px]"></div>
					</div>
					<div className="flex flex-col w-full h-full sm:px-8 md:px-4 p-4 md:py-8">
						<header className="flex gap-2">
							<p className="text-rgb-full text-sm">{announcementPublishDate}</p>
							<div className="flex justify-center items-center h-full">
								<span className="w-1 h-1 rounded-full bg-primary"></span>
							</div>
							<p className="text-rgb-full text-sm">{formattedAnnouncementTimeAgo}</p>
						</header>
						<h2 className="md:text-3xl text-xl font-xl flex !mt-4 text-rgb-full whitespace-nowrap truncate overflow-hidden w-[calc(400px - 32px)]">
							{announcement?.title}
							{loading}
						</h2>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default RelatedAnnouncementCard;
