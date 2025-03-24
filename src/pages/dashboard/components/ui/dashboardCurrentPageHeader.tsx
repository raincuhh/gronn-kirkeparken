import { uppercaseify } from "@/shared/lib/utils";
import React from "react";

type DashboardCurrentPageHeaderProps = {
	title: string;
	desc: string;
};

const DashboardCurrentPageHeader = ({ title, desc }: DashboardCurrentPageHeaderProps): React.JSX.Element => {
	return (
		<header className="flex flex-col border-b border-modifier-border-color border-solid">
			<div className="flex flex-col gap-2 mb-4">
				<h1 className="text-2xl font-xl text-text-normal">{uppercaseify(title)}</h1>
				<p className="text-lg font-lg text-text-muted">{desc}</p>
			</div>
		</header>
	);
};

export default DashboardCurrentPageHeader;
