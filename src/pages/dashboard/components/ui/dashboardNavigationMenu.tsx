import RenderList from "@/shared/components/utils/renderList";
import React from "react";
import DashboardNavigationMenuItem from "./dashboardNavigationMenuItem";
import { useLocation } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";
import { isAdmin } from "@/shared/lib/utils";

const userNavData = [
	{
		href: "/dashboard",
		title: "Profil",
	},
	{
		href: "/dashboard/photos",
		title: "Lagt ut bilder",
	},
];

const adminNavData = [
	{
		href: "/dashboard/photo-approvals",
		title: "Godkjenn Bilder",
	},
	{
		href: "/dashboard/announcements",
		title: "Kunngjøringer",
	},
];

const DashboardNavigationMenu = (): React.JSX.Element => {
	const location = useLocation();
	const { user } = useAuth();

	return (
		<div className="sm:min-w-[30%] md:min-w-[35%] w-full flex flex-col">
			<ul className="flex flex-col gap-1">
				<RenderList
					data={userNavData}
					render={(item, i) => (
						<DashboardNavigationMenuItem
							key={i}
							href={item.href}
							title={item.title}
							active={location.pathname === item.href}
						/>
					)}
				/>
				{isAdmin(user) && (
					<RenderList
						data={adminNavData}
						render={(item, i) => (
							<DashboardNavigationMenuItem
								key={`admin-${i}`}
								href={item.href}
								title={item.title}
								active={location.pathname === item.href}
							/>
						)}
					/>
				)}
			</ul>
		</div>
	);
};

export default DashboardNavigationMenu;
