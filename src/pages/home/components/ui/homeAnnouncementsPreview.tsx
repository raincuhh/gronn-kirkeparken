import React, { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/services";
import { Tables } from "@/shared/types/supabase";

const HomeAnnouncementsPreview = (): React.JSX.Element => {
	const [announcements, setAnnouncements] = useState<any[]>([]);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			const { data, error } = await supabase.from("announcements").select("*");

			if (error) {
				console.error("Error fetching announcements:", error);
				setError(error);
			} else {
				setAnnouncements(data);
			}

			fetchAnnouncements();
		};
	}, []);

	useEffect(() => {
		console.log(announcements);
	}, [announcements]);

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
