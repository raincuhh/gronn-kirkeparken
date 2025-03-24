import Button from "@/shared/components/ui/button";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

type DashboardNavigationMenuItemProps = {
	href: string;
	title: string;
	active: boolean;
};

const DashboardNavigationMenuItem = ({
	href,
	title,
	active,
}: DashboardNavigationMenuItemProps): React.JSX.Element => {
	return (
		<Link to={href} className="w-full">
			<Button
				variant={"ghost"}
				size={"md"}
				className={clsx(
					"w-full justify-start",
					active ? "!bg-interactive-base text-rgb-full hover:!bg-interactive-base-hover" : ""
				)}
			>
				{title}
			</Button>
		</Link>
	);
};

export default DashboardNavigationMenuItem;
