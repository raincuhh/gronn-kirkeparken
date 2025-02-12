import React, { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/services";
import HomeAnnouncementPreview from "./homeAnnouncementPreview";
import { useMediaQuery } from "react-responsive";
import Button from "@/shared/components/ui/button";

const HomeAnnouncementsPreviews = (): React.JSX.Element => {
	const [announcements, setAnnouncements] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [announcementError, setAnnouncementError] = useState<any>(null);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const gridSize = isOverMd ? 12 * 4 : 8 * 4;

	const fetchAnnouncements = async () => {
		setLoading(true);
		setAnnouncementError(null);

		const { data, error } = await supabase
			.from("announcements")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(3);

		if (error) {
			console.error("Error fetching announcements:", error);
			setAnnouncementError(error);
			setAnnouncements([]);
		} else {
			setAnnouncementError("test error");
			setAnnouncements(data || []);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchAnnouncements();
	}, []);

	useEffect(() => {
		console.log(announcements);
	}, [announcements]);

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
								<span className="text-text-normal">3 kunngjøringene</span> fra oss.
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
					) : announcementError ? (
						<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4">
							<p className="font-xl text-2xl text-modifier-error">{announcementError}</p>
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
					) : announcements.length > 0 ? (
						<div>
							<HomeAnnouncementPreview info={["thinawdawdag"]} />
						</div>
					) : (
						<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center">
							<p className="font-xl text-2xl">ingen nye kunngjøringer</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeAnnouncementsPreviews;
