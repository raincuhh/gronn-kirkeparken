import React, { useState, useEffect } from "react";
import Input from "@/shared/components/ui/input";
import Button from "@/shared/components/ui/button";
import useAuth from "@/features/auth/hooks/useAuth";

type EditAnnouncementFormProps = {
	initialTitle: string;
	initialContent: string;
	onSubmit: (title: string, content: string) => void;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	success: string | null;
};

const EditAnnouncementForm = ({
	initialTitle,
	initialContent,
	onSubmit,
	loading,
	error,
	setError,
	success,
}: EditAnnouncementFormProps) => {
	const [title, setTitle] = useState<string>(initialTitle);
	const [content, setContent] = useState<string>(initialContent);
	const { user, session } = useAuth();

	useEffect(() => {
		setTitle(initialTitle);
		setContent(initialContent);
	}, [initialTitle, initialContent]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!user || !session || !title.trim() || !content.trim()) {
			setError("Du må fylle ut både tittel og innhold.");
			return;
		}
		// console.log("submitting with: ", title.trim(), content.trim());
		onSubmit(title.trim(), content.trim());
	};

	return (
		<div className="flex flex-col min-w-92 lg:min-w-112 min-h-128 relative h-full">
			<div className="flex flex-col w-full">
				<header className="py-4 px-4 border-b border-modifier-border-color">
					<h1 className="text-xl font-xl">Endre en kunngjøring</h1>
				</header>
				<form onSubmit={handleSubmit} id="announcement-edit-form" className="py-4 px-4 flex flex-col">
					<div className="mb-8 flex flex-col gap-2">
						<h2>Tittel</h2>
						<Input
							className="w-full rounded-md bg-primary-alt"
							placeholder="Tittel"
							type="text"
							maxLength={100}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
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
					<Button type="submit" disabled={loading} variant="base" size="lg">
						{loading ? "Lagrer..." : "Lagre endringer"}
					</Button>
					{error && <p className="text-text-error mt-4">{error}</p>}
					{success && <p className="text-text-success mt-4">{success}</p>}
				</form>
			</div>
		</div>
		// <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
		// 	<Input placeholder="Tittel" value={title} onChange={(e) => setTitle(e.target.value)} />
		// 	<textarea
		// 		className="rounded border p-2"
		// 		placeholder="Innhold"
		// 		value={content}
		// 		onChange={(e) => setContent(e.target.value)}
		// 		rows={6}
		// 	/>
		// 	{error && <p className="text-red-500">{error}</p>}
		// 	{success && <p className="text-green-600">{success}</p>}
		// 	<Button type="submit" disabled={loading}>
		// 		{loading ? "Lagrer..." : "Lagre endringer"}
		// 	</Button>
		// </form>
	);
};

export default EditAnnouncementForm;
