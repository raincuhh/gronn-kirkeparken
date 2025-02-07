import React, { useEffect, useState } from "react";
import { supabaseInstance } from "@/shared/lib/services";

const HomeAnnouncementsPreview = (): React.JSX.Element => {
	const [announcements, setAnnouncements] = useState<any[]>([]);
	const [error, setError] = useState<any>(null);
	console.log(error);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			const { data, error } = await supabaseInstance.from("announcements").select("*");

			if (error) {
				console.error("Error fetching announcements:", error);
				setError(error);
			} else {
				setAnnouncements(data);
			}

			fetchAnnouncements();

			console.log(announcements);
		};
	}, []);

	return (
		<div
			id="announcements-preview"
			className="md:px-16 px-4 flex w-full mt-16 max-w-[1020px] mx-auto items-center"
		>
			announcements
		</div>
	);
};

export default HomeAnnouncementsPreview;
