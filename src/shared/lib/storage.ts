import { supabase } from "./services";
import { Photos } from "../types/general";

export const uploadImage = async (file: File, userId: string) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${userId}-${Date.now()}.${fileExt}`;
	const filePath = `${fileName}`;

	const { data, error } = await supabase.storage
		.from("photoalbum")
		.upload(filePath, file, { cacheControl: "3600", upsert: false });

	if (error) throw error;
	return data?.path;
};

export const getPublicImageUrl = (photo: Photos) => {
	if (!photo?.img_url) {
		throw new Error("Image URL path is missing");
	}

	const { data } = supabase.storage.from("photoalbum").getPublicUrl(photo.img_url);
	return data.publicUrl;
};

export const deleteImage = async (path: string) => {
	const { error } = await supabase.storage.from("photoalbum").remove([path]);
	if (error) throw error;
};
