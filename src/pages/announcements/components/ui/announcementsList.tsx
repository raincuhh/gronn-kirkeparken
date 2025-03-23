import React, { useEffect, useCallback, useState, useMemo } from "react";
import { supabase } from "@/shared/lib/services";
import { Announcement, Author } from "@/shared/types/general";
import { useMediaQuery } from "react-responsive";
import RenderList from "@/shared/components/utils/renderList";
import Skeleton from "react-loading-skeleton";
import AnnouncementsOptions from "./announcementsOptions";
import Button from "@/shared/components/ui/button";
import AnnouncementPreviewCard from "@/shared/components/ui/announcementPreviewCard";
import clsx from "clsx";

const AnnouncementsList = (): React.JSX.Element => {
	const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
	const [announcementsError, setAnnouncementsError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	// const gridSize = isOverMd ? 8 * 1 : 8 * 1;

	const [searchQuery, setSearchQuery] = useState<string>("");

	const from = 0;
	const to = 12;

	const fetchAnnouncements = useCallback(async () => {
		setLoading(true);
		setAnnouncementsError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("title, preview_text, created_at, announcement_id, user_id")
			.order("created_at", { ascending: false })
			.range(from, to);

		if (error) {
			console.error("Error fetching announcements:", error);
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
					if (!announcement?.user_id) return { ...announcement, author: { first_name: "Unknown" } };

					const { data: author, error } = await supabase
						.from("profiles")
						.select("first_name, last_name")
						.eq("user_id", announcement.user_id)
						.maybeSingle();

					if (error) {
						console.error("Error fetching author: ", error);
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

	const filteredAnnouncements = useMemo(() => {
		return announcementsData.filter((announcement: Announcement) =>
			announcement.title?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [announcementsData, searchQuery]);

	return (
		<div
			id="announcements-list"
			className="md:px-16 px-4 flex w-full mt-4 max-w-[1140px] mx-auto items-center"
		>
			<div className="flex flex-col w-full gap-4">
				<AnnouncementsOptions searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<div className="flex flex-col w-full  border-modifier-border-color">
					{loading ? (
						<div className="w-full mt-8 grid md:grid-cols-2 grid-cols-1 gap-8">
							<Skeleton width={"100%"} height={"16rem"} />
							<Skeleton width={"100%"} height={"16rem"} />
							<Skeleton width={"100%"} height={"16rem"} />
							<Skeleton width={"100%"} height={"16rem"} />
						</div>
					) : announcementsError ? (
						<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4">
							<p className="text-lg">En feil oppstod</p>
							<p className="font-xl text-2xl text-modifier-error">{announcementsError}</p>
							<Button
								onClick={fetchAnnouncements}
								variant={"outline"}
								size={"md"}
								rounded={"full"}
								className="font-xl"
							>
								Prøv igjen
							</Button>
						</div>
					) : filteredAnnouncements.length > 0 ? (
						<ul
							className={clsx(
								"w-full list-none border-solid border-modifier-border-color grid md:grid-cols-2 grid-cols-1 border-l",
								filteredAnnouncements.length > 1 ? "border-t" : "border-t-0"
							)}
						>
							<RenderList
								data={filteredAnnouncements}
								render={(data: Announcement & { author?: Author }, i: number) => (
									<AnnouncementPreviewCard
										key={i}
										announcement={data}
										borderT={filteredAnnouncements.length === 1 && i == 0 && isOverMd}
									/>
								)}
							/>
						</ul>
					) : (
						<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center">
							<p className="font-xl text-2xl">Ingen kunngjøringer funnet</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsList;
