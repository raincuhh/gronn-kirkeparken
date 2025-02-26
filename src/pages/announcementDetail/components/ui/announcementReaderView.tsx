import { supabase } from "@/shared/lib/services";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { sqlTimestampToDateVTwo } from "@/shared/lib/utils";
import { Announcement } from "@/shared/types/general";
import Markdown from "react-markdown";
import Button from "@/shared/components/ui/button";
import Skeleton from "react-loading-skeleton";
import RandomSkeletonLoader from "@/shared/components/utils/randomSkeletonLoader";

const AnnouncementReaderView = (): React.JSX.Element => {
	const [searchParams] = useSearchParams();
	const announcementId = searchParams.get("announcement_id");

	const [announcementData, setAnnouncementData] = useState<Announcement | null>(null);
	const [announcementError, setAnnouncementError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchAnnouncement = useCallback(async () => {
		if (!announcementId) return;
		setLoading(true);
		setAnnouncementError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("title, content, created_at, preview_text")
			.eq("announcement_id", announcementId)
			.single();

		if (error) {
			console.error("Error fetching announcement:", error);
			setAnnouncementData({});
			setAnnouncementError("Kunngjøring kunne ikke lastes inn.");
		} else {
			setAnnouncementData(data);
		}

		setLoading(false);
	}, [announcementId]);

	useEffect(() => {
		fetchAnnouncement();
	}, [fetchAnnouncement]);

	const announcementPublishDate = useMemo(() => {
		const formattedDate = sqlTimestampToDateVTwo(announcementData?.created_at ?? "");
		return formattedDate
			? formattedDate.toLocaleDateString("default", {
					year: "numeric",
					month: "short",
					day: "2-digit",
				})
			: "Ukjent Dato";
	}, [announcementData?.created_at]);

	return (
		<>
			<div
				id="announcement-reader"
				className="relative min-h-[calc(100dvh-6rem)] pt-24 md:pt-48 overflow-hidden w-full flex flex-col"
			>
				<div className="md:px-16 px-4 flex w-full max-w-[1140px] mx-auto items-center">
					<div className="flex flex-col w-full h-full">
						{loading ? (
							<>
								<header className="flex flex-col gap-4 w-full mb-4">
									<Skeleton height={"1.4rem"} width={"15%"} />
									<Skeleton height={"3rem"} width={"66%"} />
								</header>
								<div className="flex flex-col">
									<RandomSkeletonLoader />
								</div>
							</>
						) : announcementError ? (
							<div className="w-full h-full flex items-center justify-center flex-col gap-4">
								<p className="text-lg">En feil oppstod</p>
								<p className="font-xl text-2xl text-modifier-error">{announcementError}</p>
								<Button
									onClick={fetchAnnouncement}
									variant={"outline"}
									size={"md"}
									rounded={"full"}
									className="font-xl"
								>
									Prøv igjen
								</Button>
							</div>
						) : announcementData ? (
							<>
								<header className="flex flex-col">
									<p className="text-text-muted text-lg">{announcementPublishDate}</p>
									<h1 className="text-3xl sm:text-4xl font-xl !my-4">
										{announcementData?.title ?? ""}
									</h1>
								</header>
								<div className="flex flex-col gap-4">
									<p className="prose prose-invert font-xl text-lg">
										{announcementData?.preview_text ?? ""}
									</p>
									<Markdown className="prose prose-invert markdown-reset" components={{}}>
										{announcementData?.content ?? ""}
									</Markdown>
								</div>
							</>
						) : (
							<div className="flex justify-center w-full items-center">No announcementdata gotten</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AnnouncementReaderView;
