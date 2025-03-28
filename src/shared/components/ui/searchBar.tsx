import React from "react";
import Input from "./input";
import SearchIcon from "../icons/searchIcon";

type SearchBarProps = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps): React.JSX.Element => {
	return (
		<div className="relative group">
			<Input
				className="sm:w-72 group-hover:bg-secondary"
				placeholder="Søk kunngjøringer..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<div className="absolute pointer-events-none top-0 right-0 h-full w-[3rem] flex justify-center items-center rounded-r-full">
				<div className="w-[2rem] h-[2rem] mr-[0.1rem] flex items-center justify-center bg-primary group-hover:bg-secondary duration-100 ease-in-out transition-colors">
					<SearchIcon className="!w-6 !h-6 fill-base-100" />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
