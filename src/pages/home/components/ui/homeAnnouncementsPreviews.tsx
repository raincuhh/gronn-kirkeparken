import React, { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/services";
import HomeAnnouncementPreview from "./homeAnnouncementPreview";
import { Announcement, Author } from "@/shared/types/general";
import { useMediaQuery } from "react-responsive";
import Button from "@/shared/components/ui/button";
import RenderList from "@/shared/components/utils/renderList";

const HomeAnnouncementsPreviews = (): React.JSX.Element => {
	const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
	const [announcementsError, setAnnouncementsError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const gridSize = isOverMd ? 12 * 4 : 8 * 4;

	const fetchAnnouncements = async () => {
		setLoading(true);
		setAnnouncementsError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("title, preview_text, created_at, announcement_id, user_id")
			.order("created_at", { ascending: false })
			.limit(3);

		if (error) {
			console.error("Error fetching announcements:", error);
			setAnnouncementsError(error);
			setAnnouncementsData([]);
			return;
		} else {
			const announcementWithAuthor = await Promise.all(
				data.map(async (announcement: Announcement) => {
					if (!announcement.user_id) {
						return { ...announcement, author: { firstname: "Unknown" } };
					}

					const { data: authorData, error: authorError } = await supabase
						.from("users")
						.select("firstname, lastname")
						.eq("user_id", announcement.user_id)
						.maybeSingle();

					if (authorError || !authorData) {
						console.error("Error fetching author:", authorError || "no user found");
					}

					return {
						...announcement,
						author: authorData
							? { firstname: authorData.firstname, lastname: authorData.lastname }
							: "Unknown",
					};
				})
			);

			setAnnouncementsData(announcementWithAuthor || []);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchAnnouncements();
	}, []);

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
						<p className="font-xl text-2xl !mt-8">Loading...</p>
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
					) : announcementsData.length > 0 ? (
						<ul className="flex flex-col w-full !mt-8 gap-8 list-none">
							<RenderList
								data={announcementsData}
								render={(data: Announcement & { author?: Author }, i: number) => (
									<HomeAnnouncementPreview key={i} announcement={data} />
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
