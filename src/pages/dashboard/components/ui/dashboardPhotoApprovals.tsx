import React, { useCallback, useEffect, useState } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { Photos, PhotoStatus } from "@/shared/types/general";
import { supabase } from "@/shared/lib/services";
import RenderList from "@/shared/components/utils/renderList";
import DashboardPhotoApprovalsItem from "./dashboardPhotoApprovalsItem";
import Button from "@/shared/components/ui/button";
import Skeleton from "react-loading-skeleton";

type DashboardPhotoApprovalsProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardPhotoApprovals = ({ currentPageHeader }: DashboardPhotoApprovalsProps): React.JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);
	const [photos, setPhotos] = useState<Photos[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchPendingPhotos = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error: photosError } = await supabase
				.from("photos")
				.select("*")
				.eq("status", PhotoStatus.pending);

			if (photosError) throw new Error("Kunne ikke laste inn bilder.");

			setPhotos(data ?? []);
		} catch (err: any) {
			console.error(err?.message);
			setError(err?.message);
			setPhotos([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPendingPhotos();
	}, [fetchPendingPhotos]);

	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
			{loading ? (
				<div className="flex w-full flex-col gap-4">
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} />
					<Skeleton height={"2rem"} width={"80%"} />
					<Skeleton height={"2rem"} width={"40%"} />
				</div>
			) : error ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4 px-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{error}</p>
					<Button
						onClick={fetchPendingPhotos}
						variant={"outline"}
						size={"md"}
						rounded={"full"}
						className="font-xl"
					>
						Prøv igjen
					</Button>
				</div>
			) : photos.length > 0 ? (
				<ul className="flex flex-col">
					<RenderList
						data={photos}
						render={(item: Photos, i: number) => (
							<DashboardPhotoApprovalsItem
								photo={item}
								loading={loading}
								onUpdate={fetchPendingPhotos}
								key={i}
							/>
						)}
					/>
				</ul>
			) : (
				<>
					<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-y border-x flex items-center justify-center">
						<p className="font-xl text-2xl">Ingen bilder funnet.</p>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardPhotoApprovals;
