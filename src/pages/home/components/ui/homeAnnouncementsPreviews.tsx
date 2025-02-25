import React, { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/shared/lib/services";
import HomeAnnouncementPreviewCard from "./homeAnnouncementPreviewCard";
import { Announcement, Author } from "@/shared/types/general";
import { useMediaQuery } from "react-responsive";
import Button from "@/shared/components/ui/button";
import RenderList from "@/shared/components/utils/renderList";
import Skeleton from "react-loading-skeleton";

const HomeAnnouncementsPreviews = (): React.JSX.Element => {
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
			.limit(6);

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

	const memoizedAnnouncements = useMemo(() => announcementsData, [announcementsData]);

	return (
		<div
			id="announcements-preview"
			className="md:px-16 px-4 flex w-full mt-16 max-w-[1020px] mx-auto items-center"
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
						<div className="absolute w-full h-full justify-center flex items-center pb-6">
							<img
								src="./assets/images/bell.svg"
								alt="homeAnnouncementPreviewIllustrationImg"
								className="w-[6rem] sm:w-[12rem] lg:w-[14rem] bg-transparent h-auto"
							/>
						</div>
					</div>
					<div className="w-full min-h-[14rem] border-solid border-modifier-border-color border-b border-x">
						<div className="w-full h-full justify-center items-center flex flex-col gap-4 px-4 py-8">
							<h1 className="md:text-3xl text-2xl  font-xl text-center">📢 Siste kunngjøringer</h1>
							<p className="text-center text-lg font-lg text-text-muted">
								Hold deg oppdatert med de nyeste{" "}
								<span className="text-text-normal">kunngjøringene</span> fra oss.
							</p>
							<Button
								variant={"outline"}
								size={"md"}
								rounded={"full"}
								href="/announcements"
								className="font-xl"
							>
								Se fler kunngjøringer
							</Button>
						</div>
					</div>
					<div className="w-full min-h-[1.5rem] border-solid border-modifier-border-color border-b border-x"></div>
				</div>
				<div className="flex flex-col gap-8 w-full h-full justify-center items-center">
					{loading ? (
						<div className="w-full mt-8 gap-8 flex flex-col">
							<Skeleton width={"100%"} height={"14rem"} />
							<Skeleton width={"100%"} height={"14rem"} />
							<Skeleton width={"100%"} height={"14rem"} />
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
					) : memoizedAnnouncements.length > 0 ? (
						<ul className="w-full list-none border-solid border-l border-modifier-border-color grid md:grid-cols-2 grid-cols-1">
							<RenderList
								data={memoizedAnnouncements}
								render={(data: Announcement & { author?: Author }, i: number) => (
									<HomeAnnouncementPreviewCard key={i} announcement={data} />
								)}
							/>
						</ul>
					) : (
						<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center">
							<p className="font-xl text-2xl">Ingen nye kunngjøringer</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeAnnouncementsPreviews;
