import React from "react";
import MinusIcon from "@/shared/components/icons/minusIcon";
import PlusIcon from "@/shared/components/icons/plusIcon";
import clsx from "clsx";

export type DropdownItemData = {
	title: string;
	description: string[];
};

type DropdownItemProps = {
	data: DropdownItemData;
	idx: number;
	openDropdowns: number[];
	toggleDropDown: (i: number) => void;
};

const DropdownItem = ({ data, idx, openDropdowns, toggleDropDown }: DropdownItemProps): React.JSX.Element => {
	return (
		<li>
			<div
				onClick={() => toggleDropDown(idx)}
				className="group flex justify-between cursor-pointer border-modifier-border-color hover:border-accent-1 border-b-[1px] !py-2 transition-colors duration-100 ease-in-out"
			>
				<span className="text-lg font-xl group-hover:text-accent-1 transition-colors duration-100 ease-in-out">
					{data.title}
				</span>
				<span>
					{openDropdowns.includes(idx) ? (
						<MinusIcon className="!h-4 !w-4 fill-text-normal group-hover:fill-accent-1 transition-colors duration-100 ease-in-out" />
					) : (
						<PlusIcon className="!h-4 !w-4 fill-text-normal group-hover:fill-accent-1 transition-colors duration-100 ease-in-out" />
					)}
				</span>
			</div>
			<div
				className={clsx(
					"flex flex-col mt-2 transition-all duration-100 ease-in-out",
					openDropdowns.includes(idx) ? "block" : "hidden"
				)}
			>
				{data.description.map((desc, i) => (
					<p key={i} className="!mb-4 text-lg">
						{desc}
					</p>
				))}
			</div>
		</li>
	);
};

export default DropdownItem;
