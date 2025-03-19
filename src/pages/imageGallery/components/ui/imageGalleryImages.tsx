import { supabase } from "@/shared/lib/services";
import { Author, Photos, PhotoStatus } from "@/shared/types/general";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Button from "@/shared/components/ui/button";
import RenderList from "@/shared/components/utils/renderList";
import ImageGalleryMasonryCard from "./imageGalleryMasonryCard";
import Skeleton from "react-loading-skeleton";

const ImageGalleryImages = (): React.JSX.Element => {
	const [photosData, setPhotosData] = useState<any[]>([]);
	const [photoError, setPhotoError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchApprovedPhotos = useCallback(async () => {
		setLoading(true);
		setPhotoError(null);

		const { data, error } = await supabase.from("photos").select("*").eq("status", PhotoStatus.approved);

		if (error) {
			console.error("Error fetching photos: ", error);
			setPhotoError("Kunne ikke laste inn bilder");
			setPhotosData([]);
			setLoading(false);
			return;
		}

		if (!data || data.length === 0) {
			setPhotosData([]);
			setLoading(false);
			return;
		}

		const fetchPhotoAuthor = async (photos: Photos[]) => {
			const updatedPhotos = await Promise.all(
				photos.map(async (photo: Photos) => {
					if (!photo?.user_id) return { ...photo, author: { first_name: "John", last_name: "doe" } };

					const { data: author, error } = await supabase
						.from("profiles")
						.select("first_name, last_name")
						.eq("user_id", photo.user_id)
						.maybeSingle();

					if (error) {
						console.error("Error fetching author: ", error);
					}
					return { ...photo, author };
				})
			);

			setPhotosData(updatedPhotos);
			setLoading(false);
		};

		fetchPhotoAuthor(data);
	}, []);

	useEffect(() => {
		fetchApprovedPhotos();
	}, [fetchApprovedPhotos]);

	const memoizedPhotos = useMemo(() => photosData, [photosData]);

	return (
		<div className="mt-4">
			{loading ? (
				<div className="w-full mt-8 grid md:grid-cols-2 grid-cols-1 gap-8">
					<Skeleton width={"100%"} height={"16rem"} />
					<Skeleton width={"100%"} height={"16rem"} />
					<Skeleton width={"100%"} height={"16rem"} />
					<Skeleton width={"100%"} height={"16rem"} />
				</div>
			) : photoError ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{photoError}</p>
					<Button
						onClick={fetchApprovedPhotos}
						variant={"outline"}
						size={"md"}
						rounded={"full"}
						className="font-xl"
					>
						Prøv igjen
					</Button>
				</div>
			) : memoizedPhotos.length > 0 ? (
				<ul className="columns-1 sm:columns-2 md:columns-3 gap-4">
					<RenderList
						data={memoizedPhotos}
						render={(data: Photos & { author?: Author }, i: number) => (
							<ImageGalleryMasonryCard key={i} data={data} loading={loading} />
						)}
					/>
				</ul>
			) : (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-y border-x flex items-center justify-center">
					<p className="font-xl text-2xl">Ingen bilder funnet</p>
				</div>
			)}
		</div>
	);
};

export default ImageGalleryImages;
