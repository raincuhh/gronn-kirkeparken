import { Announcement } from "@/shared/types/general";
import React from "react";
import { Link } from "react-router-dom";
import { lowercaseifySentences, sanitizeAndHyphenate } from "@/shared/lib/utils";
// import { formatTextWithLineBreaks, sqlTimestampToDateVTwo } from "@/shared/lib/utils";
// import DOMPurify from "dompurify";

type RelatedAnnouncementCardProps = {
	announcement: Announcement;
	loading: boolean;
};
// make a skeleton loader later or sum
const RelatedAnnouncementCard = ({
	announcement,
	loading,
}: RelatedAnnouncementCardProps): React.JSX.Element => {
	return (
		<li className="list-none snap-start !pr-8 !pb-8 !pt-4">
			<Link
				to={"/announcements/"
					.concat(lowercaseifySentences(sanitizeAndHyphenate(announcement?.title ?? "")))
					.concat(`?announcement_id=${encodeURIComponent(announcement?.announcement_id ?? "")}`)}
				className="w-full h-full cursor-pointer"
			>
				<div className="custom-glass-card rounded-md relative overflow-hidden md:min-w-[400px] md:min-h-[200px] min-w-[300px] min-h-[150px]">
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full -z-10">
						<div className="absolute bottom-1 right-4 md:right-16 w-[70%] md:w-[40%] h-[40%] md:h-[52%] inset bg-white bg-[radial-gradient(#469646b8_1px,transparent_2px)] [background-size:16px_16px]"></div>
					</div>
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full hidden md:block -z-10">
						<div className="absolute top-4 left-4 w-[60%] md:w-[20%] h-[20%] md:h-[20%] inset bg-white bg-[radial-gradient(#4c914cb8_1px,transparent_1px)] [background-size:16px_16px]"></div>
					</div>
					<div className="flex flex-col w-full">
						<header className="flex justify-between gap-4">{loading}</header>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default RelatedAnnouncementCard;
