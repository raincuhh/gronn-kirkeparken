import { supabase } from "@/shared/lib/services";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sqlTimestampToDateVTwo } from "@/shared/lib/utils";
import { Announcement } from "@/shared/types/general";
import Markdown from "react-markdown";

const AnnouncementReaderView = (): React.JSX.Element => {
	const [searchParams] = useSearchParams();
	const announcementId = searchParams.get("announcement_id");

	const [announcementPublishDate, setAnnouncementPublishDate] = useState<string>("");

	const [announcementData, setAnnouncementData] = useState<Announcement>({});
	// const [announcementError, setAnnouncementError] = useState<any>(null);
	// const [loading, setLoading] = useState<boolean>(true);

	const fetchAnnouncement = async () => {
		// setLoading(true);
		// setAnnouncementError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("title, content, created_at")
			.eq("announcement_id", announcementId)
			.single();

		if (error) {
			console.error("Error fetching announcements:", error);
			// setAnnouncementError(error);
			setAnnouncementData({});
		} else {
			setAnnouncementData(data || {});
		}

		// setLoading(false);
	};

	useEffect(() => {
		fetchAnnouncement();
	}, []);

	useEffect(() => {
		const formattedDate = sqlTimestampToDateVTwo(announcementData?.created_at ?? "");
		setAnnouncementPublishDate(
			formattedDate
				? formattedDate?.toLocaleDateString("default", {
						year: "numeric",
						month: "short",
						day: "2-digit",
					})
				: "Ukjent Dato"
		);
	}, [announcementData]);

	return (
		<>
			<div
				id="announcement-reader"
				className="relative min-h-[calc(100dvh-6rem)] pt-24 md:pt-48 overflow-hidden w-full flex flex-col bg-[url('/assets/images/gradientBakgrunnHero.svg')] bg-cover bg-[50%] md:bg-[-20%]"
			>
				<div className="md:px-16 px-4 flex w-full max-w-[1020px] mx-auto items-center">
					<div className="flex flex-col">
						<div className="flex flex-col">
							<header className="flex flex-col">
								<p className="text-text-muted text-md font-lg md:text-xl">
									{announcementPublishDate}
								</p>
								<h1 className="text-3xl sm:text-4xl font-xl !my-4">
									{announcementData?.title ?? ""}
								</h1>
							</header>
							<div className="flex flex-col">
								{/* <p
									className="text-lg"
									dangerouslySetInnerHTML={{
										__html: formatTextWithLineBreaks(
											DOMPurify.sanitize(announcementData?.content ?? "")
										),
									}}
								></p>
								*/}
								<Markdown className="prose prose-invert markdown-reset" components={{}}>
									{announcementData?.content ?? ""}
								</Markdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AnnouncementReaderView;
