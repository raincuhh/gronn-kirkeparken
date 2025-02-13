import React from "react";
import { Link } from "react-router-dom";
import {
	lowercaseifySentences,
	sanitizeAndHyphenate,
	sqlTimestampToDateVTwo,
	timeAgo,
} from "@/shared/lib/utils";

export type Announcement = {
	announcement_id?: string;
	content?: string;
	created_at?: string | null;
	title?: string;
	user_id?: string | null;
	preview_text?: string | null;
};

type HomeAnnouncementPreviewProps = {
	data: Announcement;
};

const HomeAnnouncementPreview = ({ data }: HomeAnnouncementPreviewProps): React.JSX.Element => {
	const formattedDate = sqlTimestampToDateVTwo(data?.created_at ?? "");
	const formattedAnnouncementTimeAgo = timeAgo(formattedDate ?? new Date());

	return (
		<Link
			to={"/announcements/".concat(
				lowercaseifySentences(
					sanitizeAndHyphenate(
						data?.title?.concat("?announcement_id=".concat(data?.announcement_id ?? "")) ?? ""
					)
				)
			)}
			className="w-full h-full"
		>
			<div className="custom-glass-card p-4 min-h-[6rem]">
				<div className="flex flex-col">
					<header className="flex flex-col">
						<div className="flex justify-between">
							<p className="text-base-00 text-sm">
								{formattedDate?.getFullYear() +
									"/" +
									formattedDate?.getMonth() +
									"/" +
									formattedDate?.getDay() || data.created_at}
							</p>
							<p className="text-base-00 text-sm">{formattedAnnouncementTimeAgo}</p>
						</div>
						<h1 className="text-xl font-xl">{data.title}</h1>
					</header>
					<div className="flex flex-col gap-2">
						<p className="text-lg">{data?.preview_text}</p>
						<p className="hover:!underline underline-offset-4">les mer</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default HomeAnnouncementPreview;
