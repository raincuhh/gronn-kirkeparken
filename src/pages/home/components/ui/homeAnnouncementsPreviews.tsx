import React, { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/services";
import HomeAnnouncementPreview from "./homeAnnouncementPreview";
import { useMediaQuery } from "react-responsive";
import Button from "@/shared/components/ui/button";

const HomeAnnouncementsPreviews = (): React.JSX.Element => {
	const [announcements, setAnnouncements] = useState<any[]>([]);
	// const [error, setError] = useState<any>(null);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const gridSize = isOverMd ? 12 * 4 : 8 * 4;

	useEffect(() => {
		const fetchAnnouncements = async () => {
			const { data, error } = await supabase.from("announcements").select("*");

			if (error) {
				console.error("Error fetching announcements:", error);
				// setError(error);
				setAnnouncements([]);
			} else {
				setAnnouncements(data || []);
			}
		};

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
				<div className="flex flex-col w-full mb-16">
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
								className="w-[12rem] lg:w-[14rem] bg-transparent h-auto"
							/>
						</div>
					</div>
					<div className="w-full min-h-[14rem] border-solid border-modifier-border-color border-b border-x">
						<div className="w-full h-full justify-center items-center flex flex-col gap-4 px-4 py-8">
							<h1 className="text-3xl font-xl text-center">Siste kunngjøringer</h1>
							<p className="text-center text-lg font-lg text-text-muted">
								Hold deg oppdatert med de nyeste{" "}
								<span className="text-text-normal">3 kunngjøringene</span> fra oss.
							</p>
							<Button variant={"outline"} size={"md"} rounded={"full"} href="/announcements">
								Se fler kunngjøringer
							</Button>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-8 w-full h-full">
					<HomeAnnouncementPreview info={["thinawdawdag"]} />
					<HomeAnnouncementPreview info={["awdawdaw"]} />
					<HomeAnnouncementPreview info={["thingamajig testing"]} />
				</div>
			</div>
		</div>
	);
};

export default HomeAnnouncementsPreviews;
