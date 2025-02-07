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
				className="flex justify-between cursor-pointer border-modifier-border-color border-b-[1px] !py-2"
			>
				<span className="text-lg">{data.title}</span>
				<span>
					{openDropdowns.includes(idx) ? (
						<MinusIcon className="!h-4 !w-4 fill-text-normal" />
					) : (
						<PlusIcon className="!h-4 !w-4 fill-text-normal" />
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
					<p key={i} className="!mb-2">
						{desc}
					</p>
				))}
			</div>
		</li>
	);
};

export default DropdownItem;
