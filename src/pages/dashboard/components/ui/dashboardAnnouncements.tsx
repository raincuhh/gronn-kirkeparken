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
import useModal from "@/shared/hooks/useModal";
import { useMediaQuery } from "react-responsive";
import EditAnnouncementForm from "./editAnnouncementForm";
import { Modal } from "@/shared/types/modal";

type DashboardAnnouncementsProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardAnnouncements = ({ currentPageHeader }: DashboardAnnouncementsProps): React.JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [editLoading, setEditLoading] = useState(false);
	const [editError, setEditError] = useState<string | null>(null);
	const [editSuccess, setEditSuccess] = useState<string | null>(null);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const { open, remove } = useModal();

	const fetchAnnouncements = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error: announcementError } = await supabase
				.from("announcements")
				.select("*")
				.order("created_at", { ascending: false });

			if (announcementError) {
				throw new Error("Kunne ikke laste inn kunngjøringer.");
			}
			// console.log(data);
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

	const handleDeleteAnnouncement = useCallback(async (id: string) => {
		try {
			const { error } = await supabase.from("announcements").delete().eq("announcement_id", id);

			if (error) {
				throw new Error("Kunne ikke slette kunngjøringen.");
			}

			fetchAnnouncements();
		} catch (err: any) {
			console.error(err?.message);
		}
	}, []);

	const handleEditAnnouncement = useCallback(
		(announcement: Announcement) => {
			const onSubmit = async (title: string, content: string) => {
				// console.log("clicking handle edit announcement");
				// console.log("Updated data before supabase update:", { title, content });

				try {
					setEditLoading(true);
					setEditError(null);
					setEditSuccess(null);
					// console.log("before supabase update data: ", title, content);

					const { error: updateError } = await supabase
						.from("announcements")
						.update({ title, content })
						.eq("announcement_id", announcement.announcement_id);

					// console.log("Update result:", data);

					if (updateError) throw new Error("Kunne ikke oppdatere kunngjøring.");

					setEditSuccess("Kunngjøring oppdatert!");
					fetchAnnouncements();
					remove();
				} catch (err: any) {
					setEditError(err.message);
				} finally {
					setEditLoading(false);
				}
			};

			const modalContent: Modal = {
				id: "edit-announcement",
				content: (
					<EditAnnouncementForm
						initialTitle={announcement.title ?? ""}
						initialContent={announcement.content || ""}
						onSubmit={onSubmit}
						loading={editLoading}
						error={editError}
						setError={setEditError}
						success={editSuccess}
					/>
				),
				size: "custom",
				justify: isOverMd ? "right" : "center",
				align: isOverMd ? "right" : "bottom",
				className: isOverMd
					? "h-full border-l rounded-tl-md rounded-bl-md"
					: "w-full border-t rounded-tl-md rounded-tr-md",
			};

			open(modalContent);
		},
		[fetchAnnouncements, isOverMd, open, remove, editLoading, editError, editSuccess]
	);

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
				onNewAnnouncement={fetchAnnouncements}
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
								<DashboardAnnouncementsItem
									key={i}
									announcement={item}
									onDelete={handleDeleteAnnouncement}
									onEdit={handleEditAnnouncement}
								/>
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
	onDelete: (id: string) => void;
	onEdit: (announcement: Announcement) => void;
};

const DashboardAnnouncementsItem = ({ announcement, onDelete, onEdit }: DashboardAnnouncementsItemProps) => {
	return (
		<li className="list-none">
			<div className="w-full h-full cursor-pointer group transition-all duration-100 ease-in-out">
				<div className="flex w-full items-center border px-4 py-2 border-modifier-border-color border-solid group-hover:bg-primary-alt transition-colors duration-100 ease-in-out rounded-md">
					<div className="flex justify-between w-full items-center">
						<div className="truncate md:max-w-[50%] sm:max-w-[40%] max-w-[25%]">
							{announcement.title}
						</div>
						<DashboardAnnouncementsItemOptions
							announcement={announcement}
							onDelete={onDelete}
							onEdit={onEdit}
						/>
					</div>
				</div>
			</div>
		</li>
	);
};

type DashboardAnnouncementsItemOptionsProps = {
	announcement: Announcement;
	onDelete: (id: string) => void;
	onEdit: (announcement: Announcement) => void;
};

const DashboardAnnouncementsItemOptions = ({
	announcement,
	onDelete,
	onEdit,
}: DashboardAnnouncementsItemOptionsProps) => {
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
					<Button variant={"link"} onClick={() => onEdit(announcement)}>
						Rediger
					</Button>
				</div>
				<Button variant={"destructive"} onClick={() => onDelete(announcement?.announcement_id ?? "")}>
					Slett
				</Button>
			</div>
		</div>
	);
};
