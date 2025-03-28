import React, { useState } from "react";
import Input from "@/shared/components/ui/input";
import Button from "@/shared/components/ui/button";
import useAuth from "@/features/auth/hooks/useAuth";

type NewAnnouncementFormProps = {
	onSubmit: (title: string, content: string) => void;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	success: string | null;
};

const NewAnnouncementForm = ({ onSubmit, loading, error, setError, success }: NewAnnouncementFormProps) => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const { user, session } = useAuth();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!user || !session || !title.trim() || !content.trim()) {
			setError("Du må fylle ut både tittel og innhold.");
			return;
		}

		onSubmit(title, content);
	};
	return (
		<div className="flex flex-col min-w-92 lg:min-w-112 min-h-128 relative h-full">
			<div className="flex flex-col w-full">
				<header className="py-4 px-4 border-b border-modifier-border-color">
					<h1 className="text-xl font-xl">Lag en ny kunngjøring</h1>
				</header>
				<form onSubmit={handleSubmit} id="announcement-form" className="py-4 px-4 flex flex-col">
					<div className="mb-8 flex flex-col gap-2">
						<h2>Tittel</h2>
						<Input
							className="w-full rounded-md bg-primary-alt"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength={100}
							placeholder="Skriv inn tittel (maks 100 tegn)"
						/>
					</div>
					<div className="mb-8 flex flex-col gap-2">
						<div className="flex w-full justify-between">
							<h2>Innhold</h2>
							<span>Er Markdown*</span>
						</div>
						<textarea
							className="w-full rounded-md bg-primary-alt px-4 py-2 border-solid border-modifier-border-color border"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={6}
							placeholder="Skriv inn innhold"
						/>
					</div>
					<Button
						type="submit"
						disabled={loading || !title.trim() || !content.trim()}
						variant={"base"}
						size={"lg"}
					>
						{loading ? "Laster..." : "Opprett ny kunngjøring"}
					</Button>
					{error && <p className="text-text-error mt-4">{error}</p>}
					{success && <p className="text-text-success mt-4">{success}</p>}
				</form>
			</div>
		</div>
	);
};

export default NewAnnouncementForm;
