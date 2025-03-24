import React, { useState } from "react";
import Input from "@/shared/components/ui/input";
import UploadIcon from "@/shared/components/icons/uploadIcon";
import Button from "@/shared/components/ui/button";
import useAuth from "@/features/auth/hooks/useAuth";

type ImageUploadFormProps = {
	onSubmit: (file: File | null, caption: string) => void;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	success: string | null;
};

const ImageUploadForm = ({
	onSubmit,
	loading,
	error,
	setError,
	success,
}: ImageUploadFormProps): React.JSX.Element => {
	const [file, setFile] = useState<File | null>(null);
	const [caption, setCaption] = useState<string>("");
	const { user, session } = useAuth();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!user || !session) {
			setError("du må være logget inn for å legge til bilder");
			return;
		}

		onSubmit(file, caption);
	};

	return (
		<div className="flex flex-col min-w-92 lg:min-w-112 min-h-128 relative h-full">
			<div className="flex flex-col w-full">
				<header className="py-4 px-4 border-b border-modifier-border-color">
					<h1 className="text-xl font-xl">Last opp et bilde</h1>
				</header>
				<form onSubmit={handleSubmit} id="gallery-upload" className="py-4 px-4 flex flex-col">
					<div className="mb-8 flex flex-col gap-2">
						<h2>Velg et bilde</h2>
						<div className="w-full flex flex-col">
							<label
								htmlFor="choose-file"
								className="w-full px-4 py-2 border border-modifier-border-color bg-primary-alt hover:bg-secondary rounded-md flex justify-center cursor-pointer"
							>
								<span className="flex gap-2">
									{file ? file.name : "Velg fil"}
									<UploadIcon />
								</span>
							</label>
							<input
								className="hidden"
								type="file"
								id="choose-file"
								accept="image/png, image/jpeg"
								onChange={handleFileChange}
							/>
						</div>
					</div>
					<div className="mb-8 flex flex-col gap-2">
						<h2>Legg til en beskrivelse</h2>
						<div className="relative group">
							<Input
								className="w-full rounded-md bg-primary-alt pr-12"
								type="text"
								value={caption}
								onChange={(e) => setCaption(e.target.value)}
								maxLength={80}
							/>
							<div className="absolute h-full w-6 top-0 right-4 flex justify-center items-center">
								<span className="bg-primary-alt group-hover:bg-secondary h-[75%] px-2 py-2 text-text-muted font-md flex justify-center items-center transition-colors duration-100 ease-in-out">
									{80 - caption.length}
								</span>
							</div>
						</div>
					</div>

					<Button type="submit" disabled={loading} variant={"base"} size={"lg"}>
						{loading ? "Laster..." : "Last opp"}
					</Button>
					{error && <p className="text-text-error">{error}</p>}
					{success && <p className="text-text-success">{success}</p>}
				</form>
			</div>
		</div>
	);
};

export default ImageUploadForm;
