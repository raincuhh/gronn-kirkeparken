import SearchIcon from "@/shared/components/icons/searchIcon";
import Input from "@/shared/components/ui/input";
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
			<div></div>
			<div className="relative group">
				<Input
					className="w-72 group-hover:bg-secondary"
					placeholder="Søk kunngjøringer ..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				></Input>
				<div className="absolute pointer-events-none top-0 right-0 h-full w-[3rem] flex justify-center items-center rounded-r-full">
					<div className="w-[2rem] h-[2rem] mr-[0.1rem] flex items-center justify-center bg-primary group-hover:bg-secondary duration-100 ease-in-out transition-colors">
						<SearchIcon className="!w-6 !h-6 fill-base-100" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsOptions;
