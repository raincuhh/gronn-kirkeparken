import { uppercaseifySentences } from "@/shared/lib/utils";
import React from "react";

type DashboardProfileItemProps = {
	title: string;
	dataText: string;
};

const DashboardProfileItem = ({ title, dataText }: DashboardProfileItemProps): React.JSX.Element => {
	return (
		<>
			<li className="w-full flex sm:flex-row flex-col justify-between border-solid border-b border-modifier-border-color !py-4">
				<h3 className="text-lg font-lg">{uppercaseifySentences(title)}</h3>
				<div className="text-lg font-lg text-text-muted hover:text-text-normal w-fu duration-100 ease-in-out transition-colors cursor-pointer">
					{dataText}
				</div>
			</li>
		</>
	);
};

export default DashboardProfileItem;
