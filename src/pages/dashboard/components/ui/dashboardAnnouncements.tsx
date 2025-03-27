import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { Announcement } from "@/shared/types/general";
import { supabase } from "@/shared/lib/services";
import Skeleton from "react-loading-skeleton";
import Button from "@/shared/components/ui/button";
import RenderList from "@/shared/components/utils/renderList";
import { lowercaseifySentences, sanitizeAndHyphenate } from "@/shared/lib/utils";
import AnnouncementsOptions from "@/pages/announcements/components/ui/announcementsOptions";

type DashboardAnnouncementsProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardAnnouncements = ({ currentPageHeader }: DashboardAnnouncementsProps): React.JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const fetchAnnouncements = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error: announcementError } = await supabase
				.from("announcements")
				.select("title, preview_text, created_at, announcement_id, user_id")
				.order("created_at", { ascending: false });

			if (announcementError) {
				throw new Error("Kunne ikke laste inn kunngjøringer.");
			}

			setAnnouncements(data);
		} catch (err: any) {
			console.error(err?.message);
			setError(err?.message);
			setAnnouncements([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAnnouncements();
	}, [fetchAnnouncements]);

	const filteredAnnouncements = useMemo(() => {
		return announcements.filter((announcement: Announcement) =>
			announcement.title?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [announcements, searchQuery]);

	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
			<AnnouncementsOptions
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				showNewAnnouncementButton={true}
			/>
			{loading ? (
				<div className="flex flex-col gap-4">
					<Skeleton width={"100%"} height={"2rem"} />
					<Skeleton width={"100%"} height={"2rem"} />
					<Skeleton width={"100%"} height={"2rem"} />
					<Skeleton width={"100%"} height={"2rem"} />
					<Skeleton width={"100%"} height={"2rem"} />
					<Skeleton width={"100%"} height={"2rem"} />
				</div>
			) : error ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{error}</p>
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
				<div className="flex flex-col">
					<ul className="flex flex-col gap-2">
						<RenderList
							data={filteredAnnouncements}
							render={(item: Announcement, i: number) => (
								<DashboardAnnouncementsItem key={i} announcement={item} />
							)}
						/>
					</ul>
				</div>
			) : (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-y border-x flex items-center justify-center">
					<p className="font-xl text-2xl">Ingen kunngjøringer funnet</p>
				</div>
			)}
		</div>
	);
};

export default DashboardAnnouncements;

type DashboardAnnouncementsItemProps = {
	announcement: Announcement;
};

const DashboardAnnouncementsItem = ({ announcement }: DashboardAnnouncementsItemProps) => {
	return (
		<li className="list-none">
			<div className="w-full h-full cursor-pointer group transition-all duration-100 ease-in-out">
				<div className="flex w-full items-center border px-4 py-2 border-modifier-border-color border-solid group-hover:bg-primary-alt transition-colors duration-100 ease-in-out rounded-md">
					<div className="flex justify-between w-full items-center">
						<div className="truncate md:max-w-[50%] sm:max-w-[40%] max-w-[25%]">
							{announcement.title}
						</div>
						<DashboardAnnouncementsItemOptions announcement={announcement} />
					</div>
				</div>
			</div>
		</li>
	);
};

type DashboardAnnouncementsItemOptionsProps = {
	announcement: Announcement;
};

const DashboardAnnouncementsItemOptions = ({ announcement }: DashboardAnnouncementsItemOptionsProps) => {
	return (
		<div className="flex">
			<div className="flex items-center">
				<div className="border-solid border-r-[1px] border-modifier-border-color">
					<Button
						variant={"link"}
						href={"/announcements/"
							.concat(lowercaseifySentences(sanitizeAndHyphenate(announcement?.title ?? "")))
							.concat(`?announcement_id=${encodeURIComponent(announcement?.announcement_id ?? "")}`)}
					>
						Se
					</Button>
				</div>
				<div className="border-solid border-r-[1px] border-modifier-border-color mr-4">
					<Button variant={"link"}>Rediger</Button>
				</div>
				<Button variant={"destructive"}>Slett</Button>
			</div>
		</div>
	);
};
