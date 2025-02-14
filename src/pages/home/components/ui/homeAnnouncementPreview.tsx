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
import { Announcement, Author } from "@/shared/types/general";
import clsx from "clsx";

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
		<li className="list-none">
			<Link
				to={"/announcements/"
					.concat(lowercaseifySentences(sanitizeAndHyphenate(announcement?.title ?? "")))
					.concat(`?announcement_id=${encodeURIComponent(announcement?.announcement_id ?? "")}`)}
				className="w-full h-full cursor-pointer"
			>
				<div className="custom-glass-card rounded-md relative overflow-hidden">
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full -z-10">
						<div className="absolute bottom-1 right-4 md:right-16 w-[70%] md:w-[64%] h-[40%] md:h-[52%] inset bg-white bg-[radial-gradient(#469646b8_1px,transparent_2px)] [background-size:16px_16px]"></div>
					</div>
					<div className="absolute inset-0 bottom-0 right-0 w-full h-full hidden md:block -z-10">
						<div className="absolute top-4 left-4 w-[60%] md:w-[20%] h-[20%] md:h-[40%] inset bg-white bg-[radial-gradient(#4c914cb8_1px,transparent_1px)] [background-size:16px_16px]"></div>
					</div>
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
							<div className="flex flex-col gap-4">
								<h1 className="text-2xl md:text-3xl font-xl !mt-4 text-rgb-full">
									{announcement?.title}
								</h1>
								{announcement?.preview_text != "" && (
									<div className="relative">
										<p
											className="text-lg overflow-hidden text-rgb-full"
											dangerouslySetInnerHTML={{ __html: sanitizedFormattedPreviewText }}
										></p>
									</div>
								)}
								<div className="flex gap-4 items-center">
									<div className="min-w-[2rem] min-h-[2rem] rounded-full bg-primary"></div>
									<div className="flex gap-2">
										<p className="font-xl text-lg text-rgb-full">
											{announcement.author?.firstname}
										</p>
										{announcement.author?.lastname != "" || null ? (
											<p className="font-xl text-lg text-rgb-full">
												{announcement.author?.lastname}
											</p>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default HomeAnnouncementPreview;
