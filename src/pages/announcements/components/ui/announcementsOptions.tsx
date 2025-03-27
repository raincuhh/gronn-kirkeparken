import React, { useCallback, useMemo, useState } from "react";
import SearchBar from "@/shared/components/ui/searchBar";
import Button from "@/shared/components/ui/button";
import { Modal } from "@/shared/types/modal";
import { useMediaQuery } from "react-responsive";
import useModal from "@/shared/hooks/useModal";
import { supabase } from "@/shared/lib/services";
import NewAnnouncementForm from "@/pages/dashboard/components/ui/newAnnouncementForm";

type AnnouncementsOptionsProps = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	showNewAnnouncementButton?: boolean;
};

const AnnouncementsOptions = ({
	searchQuery,
	setSearchQuery,
	showNewAnnouncementButton = false,
}: AnnouncementsOptionsProps): React.JSX.Element => {
	const { open, remove } = useModal();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<string | null>(null);
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });

	const handleFormSubmit = async (title: string, content: string) => {
		try {
			setError(null);
			setSuccess(null);
			setLoading(true);

			const { error } = await supabase.from("announcements").insert([
				{
					title,
					content,
				},
			]);

			if (error) {
				throw new Error("Kunne ikke opprette kunngjøring. Prøv igjen.");
			}

			setSuccess("Kunngjøring opprettet!");
		} catch (err: any) {
			console.error(err.message);
			setError(err.message);
		} finally {
			setLoading(false);
			remove();
		}
	};

	const modalContent = useMemo<Modal>(
		() => ({
			id: "upload-image-to-image-gallery",
			content: (
				<NewAnnouncementForm
					onSubmit={handleFormSubmit}
					loading={loading}
					error={error}
					setError={setError}
					success={success}
				/>
			),
			size: "custom",
			justify: isOverMd ? "right" : "center",
			align: isOverMd ? "right" : "bottom",
			className: isOverMd
				? "h-full border-l rounded-tl-md rounded-bl-md"
				: "w-full border-t rounded-tl-md rounded-tr-md",
		}),
		[isOverMd, handleFormSubmit]
	);

	const handleOpenModal = useCallback(() => {
		open(modalContent);
	}, [open, modalContent]);

	return (
		<div className="flex justify-between w-full items-center">
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			{showNewAnnouncementButton && (
				<Button variant={"base"} onClick={handleOpenModal}>
					Ny kunngjøring
				</Button>
			)}
		</div>
	);
};

export default AnnouncementsOptions;
