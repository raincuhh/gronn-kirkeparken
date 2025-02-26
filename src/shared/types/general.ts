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

export type User = {
	user_id?: string;
	first_name?: string;
	last_name?: string | null;
	email?: string;
	password?: string;
	created_at?: Date;
	role?: UserRoles;
};

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
