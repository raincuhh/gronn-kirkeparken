import React from "react";
import { Link } from "react-router-dom";
import {
	formatTextWithLineBreaks,
	lowercaseifySentences,
	sanitizeAndHyphenate,
	sqlTimestampToDateVTwo,
	timeAgo,
} from "@/shared/lib/utils";
import DOMPurify from "dompurify";
import clsx from "clsx";

export type Announcement = {
	announcement_id?: string;
	content?: string;
	created_at?: string | null;
	title?: string;
	user_id?: string | null;
	preview_text?: string | null;
};

export type Author = { firstname?: string | null; lastname?: string | null };

type HomeAnnouncementPreviewProps = {
	announcement: Announcement & { author?: Author };
};

const HomeAnnouncementPreview = ({ announcement }: HomeAnnouncementPreviewProps): React.JSX.Element => {
	const formattedDate = sqlTimestampToDateVTwo(announcement?.created_at ?? "");
	const formattedAnnouncementTimeAgo = timeAgo(formattedDate ?? new Date());
	const formattedPreviewText = formatTextWithLineBreaks(announcement?.preview_text ?? "");
	const sanitizedFormattedPreviewText = DOMPurify.sanitize(formattedPreviewText);
	const announcementPublishDate = formattedDate?.toLocaleDateString("default", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});

	return (
		<li>
			<Link
				to={"/announcements/".concat(
					lowercaseifySentences(
						sanitizeAndHyphenate(
							announcement?.title?.concat(
								"?announcement_id=".concat(announcement?.announcement_id ?? "")
							) ?? ""
						)
					)
				)}
				className="w-full h-full cursor-pointer"
			>
				<div className="custom-glass-card rounded-md relative overflow-hidden">
					<div
						className={clsx(
							"flex flex-co px-4 sm:px-8 md:px-16",
							formattedPreviewText != "" ? "py-8 md:py-16" : " pt-8 pb-8 md:pt-16 md:pb-12"
						)}
					>
						<div className="flex flex-col w-full">
							<header className="flex justify-between gap-4">
								<p className="text-rgb-full">{announcementPublishDate}</p>
								<p className="text-rgb-full">{formattedAnnouncementTimeAgo}</p>
							</header>
							<h1 className="text-2xl md:text-3xl font-xl !my-2 md:!my-4 text-rgb-full">
								{announcement?.title}
							</h1>
							<p
								className="text-lg overflow-hidden text-rgb-full"
								dangerouslySetInnerHTML={{ __html: sanitizedFormattedPreviewText }}
							></p>
							<div className="flex gap-4 items-center mt-2 md:mt-4">
								<div className="min-w-[2rem] min-h-[2rem] rounded-full bg-primary"></div>
								<div className="flex flex-col">
									<p className="font-xl text-lg text-rgb-full">{announcement.author?.firstname}</p>
									{announcement.author?.lastname != "" || null ? (
										<p className="">{announcement.author?.lastname}</p>
									) : null}
								</div>
							</div>
						</div>
					</div>
					<div className="absolute inset-0"></div>
				</div>
			</Link>
		</li>
	);
};

export default HomeAnnouncementPreview;
