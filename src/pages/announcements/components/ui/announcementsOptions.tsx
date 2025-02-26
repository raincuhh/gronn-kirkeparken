import SearchBar from "@/shared/components/ui/searchBar";
import React from "react";

type AnnouncementsOptionsProps = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const AnnouncementsOptions = ({
	searchQuery,
	setSearchQuery,
}: AnnouncementsOptionsProps): React.JSX.Element => {
	return (
		<div className="flex justify-between w-full">
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
		</div>
	);
};

export default AnnouncementsOptions;
