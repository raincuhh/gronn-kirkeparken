export type Announcement = {
	announcement_id?: string;
	content?: string;
	created_at?: string | null;
	title?: string;
	user_id?: string | null;
	preview_text?: string | null;
};

export type Author = { firstname?: string | null; lastname?: string | null };

export enum UserRoles {
	user = "user",
	admin = "admin",
}

export enum PhotoStatus {
	pending = "pending",
	rejected = "rejected",
	approved = "approved",
}

export type Photos = {
	photo_id?: string;
	user_id?: string;
	img_url?: string;
	caption: string | null;
	status: PhotoStatus;
	created_at?: string | null;
};
