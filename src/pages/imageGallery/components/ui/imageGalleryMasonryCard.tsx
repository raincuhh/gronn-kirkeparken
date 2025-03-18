import { Author, Photos } from "@/shared/types/general";
import React, { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getImageUrl } from "@/shared/lib/storage";

type ImageGalleryMasonryCardProps = {
	data: Photos & { author?: Author };
	loading: boolean;
};

const ImageGalleryMasonryCard = ({ data, loading }: ImageGalleryMasonryCardProps): React.JSX.Element => {
	const [publicUrl, setPublicUrl] = useState<string>("");

	const getPublicUrl = useCallback(() => {
		if (data?.img_url) {
			const urlObject = getImageUrl(data.img_url);
			if (urlObject && urlObject.publicUrl) {
				setPublicUrl(urlObject.publicUrl);
				console.log(urlObject.publicUrl);
			} else {
				console.log("No public URL available");
			}
		} else {
			console.log("Image URL is undefined");
		}
	}, [data?.img_url]);

	useEffect(() => {
		getPublicUrl();
	}, [getPublicUrl]);

	return (
		<li className="break-inside-avoid !mb-4  min-h-10">
			{loading ? (
				<Skeleton height={300} />
			) : (
				<div className="flex flex-col rounded-md hover:bg-primary-alt group transition-colors duration-100 ease-in-out">
					<div className="relative">
						<img src={publicUrl} alt={data?.caption ?? ""} className="w-full block rounded-t-md" />
					</div>
					<div className="flex flex-col px-2 py-2">
						<p className="text-">{data?.caption}</p>
					</div>
					{/* <div className="flex flex-col">
						<div className="relative group">
							<img src={publicUrl} alt={data?.caption ?? ""} className="w-full block" />
							<div className="absolute hidden group-hover:block w-full h-full"></div>
						</div>
						<div className="flex flex-col gap-4">
							<p className="text-">{data?.caption}</p>
							<div className="flex gap-4 items-center mt-auto">
								<div className="min-w-[2rem] min-h-[2rem] rounded-full bg-accent border-solid border-y border-x border-modifier-border-color"></div>
								<div className="flex gap-2 text-text-muted group-hover:text-text-normal transition-colors duration-100 ease-in-out">
									<p className="font-xl text-lg">{data.author?.first_name}</p>
									{data.author?.last_name != "" || null ? (
										<p className="font-xl text-lg">{data.author?.last_name}</p>
									) : null}
								</div>
							</div>
						</div>
					</div> */}
				</div>
			)}
		</li>
	);
};

export default ImageGalleryMasonryCard;
