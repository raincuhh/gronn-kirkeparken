import React, { useEffect, useCallback, useState, useMemo } from "react";
import { supabase } from "@/shared/lib/services";
import { Announcement, Author } from "@/shared/types/general";
import { useMediaQuery } from "react-responsive";
import RenderList from "@/shared/components/utils/renderList";
import Skeleton from "react-loading-skeleton";

const AnnouncementsList = (): React.JSX.Element => {
	const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
	const [announcementsError, setAnnouncementsError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const gridSize = isOverMd ? 12 * 4 : 8 * 4;

	const fetchAnnouncements = useCallback(async () => {
		setLoading(true);
		setAnnouncementsError(null);

		const { data, error: announcementsError } = await supabase
			.from("announcements")
			.select("title, preview_text, created_at, announcement_id, user_id")
			.order("created_at", { ascending: false })
			.limit(4);

		if (announcementsError) {
			console.error("Error fetching announcements:", announcementsError);
			setAnnouncementsError("Kunne ikke laste inn kunngjøringer.");
			setAnnouncementsData([]);
			setLoading(false);
			return;
		}

		if (!data || data.length === 0) {
			setAnnouncementsData([]);
			setLoading(false);
			return;
		}

		const fetchAuthors = async (announcements: Announcement[]) => {
			const updatedAnnouncements = await Promise.all(
				announcements.map(async (announcement) => {
					if (!announcement?.user_id) return { ...announcement, author: { firstname: "Unknown" } };

					const { data: author, error: authorError } = await supabase
						.from("users")
						.select("firstname, lastname")
						.eq("user_id", announcement.user_id)
						.maybeSingle();

					if (authorError) {
						console.error("Error fetching author:", authorError);
					}
					return { ...announcement, author };
				})
			);

			setAnnouncementsData(updatedAnnouncements);
			setLoading(false);
		};

		fetchAuthors(data);
	}, []);

	useEffect(() => {
		fetchAnnouncements();
	}, [fetchAnnouncements]);

	return (
		<div
			id="announcements-list"
			className="md:px-16 px-4 flex w-full mt-16 md:mt-48 max-w-[1140px] mx-auto items-center"
		>
			<div className="flex flex-col w-full">
				<div className="flex flex-col w-full">
					<div className="relative grid grid-cols-8 grid-rows-4 md:grid-cols-12 md:grid-rows-4 border-t border-l border-modifier-border-color">
						{[...Array(gridSize)].map((_, i: number) => (
							<div
								key={i}
								className="border-r border-b border-modifier-border-color"
								style={{ aspectRatio: "1" }}
							></div>
						))}
					</div>
					<div className="w-full min-h-[1.5rem] border-solid border-modifier-border-color border-b border-x"></div>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsList;
