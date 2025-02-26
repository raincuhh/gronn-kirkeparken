import { Author, Photos } from "@/shared/types/general";
import React from "react";
import Skeleton from "react-loading-skeleton";

type ImageGalleryMasonryCardProps = {
	data: Photos & { author?: Author };
	loading: boolean;
};

const ImageGalleryMasonryCard = ({ data, loading }: ImageGalleryMasonryCardProps): React.JSX.Element => {
	return (
		<div className="break-inside-avoid mb-4 rounded-sm">
			{loading ? (
				<Skeleton />
			) : (
				<>
					<div className="flex flex-col">
						<div className="relative group">
							<img src={data.img_url} alt={data?.caption ?? ""} className="w-full block" />
							<div className="absolute hidden group-hover:block w-full h-full"></div>
						</div>
						<div className="flex flex-col gap-4">
							<p>{data?.caption}</p>
							{/* <div className="flex gap-4 items-center mt-auto">
								<div className="min-w-[2rem] min-h-[2rem] rounded-full bg-accent border-solid border-y border-x border-modifier-border-color"></div>
								<div className="flex gap-2 text-text-muted group-hover:text-text-normal transition-colors duration-100 ease-in-out">
									<p className="font-xl text-lg">{data.author?.firstname}</p>
									{data.author?.lastname != "" || null ? (
										<p className="font-xl text-lg">{data.author?.lastname}</p>
									) : null}
								</div>
							</div> */}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ImageGalleryMasonryCard;
