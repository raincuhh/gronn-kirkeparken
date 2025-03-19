import { supabase } from "./services";

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

export const getImageUrl = (path: string) => {
	if (!path) {
		throw new Error("Image path is required");
	}

	const { data } = supabase.storage.from("photoalbum").getPublicUrl(path);

	// if (error) {
	//   throw new Error(`Error getting image URL: ${error.message}`);
	// }

	return data.publicUrl;
};

export const deleteImage = async (path: string) => {
	const { error } = await supabase.storage.from("photoalbum").remove([path]);
	if (error) throw error;
};
