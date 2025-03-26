import UploadIcon from "@/shared/components/icons/uploadIcon";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";
import React, { useCallback, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ImageUploadForm from "./imageUploadForm";
import { uploadImage } from "@/shared/lib/storage";
import { supabase } from "@/shared/lib/services";
import { PhotoStatus } from "@/shared/types/general";
import useAuth from "@/features/auth/hooks/useAuth";
import Button from "@/shared/components/ui/button";

const ImageGalleryHeader = (): React.JSX.Element => {
	const { open, remove } = useModal();
	const isOverMd = useMediaQuery({ query: "(min-width: 768px)" });
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const { user } = useAuth();

	const handleFormSubmit = async (file: File | null, caption: string) => {
		try {
			setError(null);
			setSuccess(null);
			setLoading(true);

			if (caption?.length > 120) {
				throw new Error("beskrivelsen må være maks 120 karakterer lang.");
			}

			if (!file) {
				throw new Error("Du må velge en fil.");
			}

			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();

			if (!user || userError) {
				throw new Error("Du må logge inn for å laste opp bilder.");
			}
			const file_url = await uploadImage(file, user.id);

			const { error } = await supabase.from("photos").insert([
				{
					user_id: user.id,
					img_url: file_url,
					caption: caption || null,
					status: PhotoStatus.pending,
				},
			]);

			if (error) {
				throw new Error("Noe gikk feil, prøv igjen.");
			}

			setSuccess("Bildet ble lastet opp!");
		} catch (err: any) {
			console.error(err?.message);
			setError(err?.message);
		} finally {
			setLoading(false);
			remove();
			setSuccess(null);
		}
	};

	const modalContent = useMemo<Modal>(
		() => ({
			id: "upload-image-to-image-gallery",
			content: (
				<ImageUploadForm
					onSubmit={handleFormSubmit}
					loading={loading}
					success={success}
					error={error}
					setError={setError}
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
		<header
			id="image-gallery-header"
			className=" flex w-full mt-16 border-solid border-modifier-border-color border-b"
		>
			<div className="flex flex-col w-full md:px-16 px-4 md:py-12 py-8 max-w-[1140px] mx-auto md:min-h-48 gap-4">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<h1 className="text-2xl sm:text-3xl font-xl !mb-4">Bildegalleri</h1>
						<p className="text-text-muted text-md md:text-lg font-lg">
							Bla gjennom de nyeste bildene fra Grønn Kirkeparken, delt av fellesskapet. Har du et
							bilde å dele? Logg inn eller Registrer deg og last opp et bilde med en beskrivelse og
							bidra til galleriet!
						</p>
					</div>
					<div>
						{!user ? (
							<div className="flex gap-4">
								<Button
									variant={"base"}
									href={"/register"}
									className="whitespace-nowrap overflow-hidden text-ellipsis"
								>
									Registrer deg
								</Button>
							</div>
						) : (
							<div
								onClick={handleOpenModal}
								className="p-1 flex justify-center items-center rounded-md border-solid border-[1px] border-modifier-border-color hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default"
							>
								<UploadIcon />
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default ImageGalleryHeader;
