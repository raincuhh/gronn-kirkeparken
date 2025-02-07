import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterNavigation from "./footerNavigation";

type PageFooterProps = { isPrivateRoute: boolean };

const footerLinks = [
	{
		title: "Navigasjon",
		links: [
			{ title: "Hjem", href: "/home" },
			{ title: "Kunngjøringer", href: "/announcements" },
			{ title: "Fotoalbum", href: "/photo-album" },
		],
	},
	{
		title: "Konto",
		links: [
			{ title: "Logg inn", href: "/login" },
			{ title: "Registrer", href: "/register" },
			{ title: "Dashboard", href: "/dashboard" },
		],
	},
	{
		title: "Sosiale Medier",
		links: [
			{ title: "Facebook", href: "https://facebook.com" },
			{ title: "Instagram", href: "https://instagram.com" },
			{ title: "Twitter", href: "https://twitter.com" },
		],
	},
];

const adminLinks = {
	title: "Admin",
	links: [
		{ title: "Godkjenn bilder", href: "/dashboard/photo-approvals" },
		{ title: "Administrer kunngjøringer", href: "/dashboard/announcements" },
	],
};

const PageFooter = ({ isPrivateRoute }: PageFooterProps): React.JSX.Element => {
	return (
		<footer
			className={clsx(
				"md:px-16 px-4 pb-16 pt-24 flex flex-row justify-between w-full max-w-[1020px] mx-auto items-center relative h-full",
				isPrivateRoute ? "" : ""
			)}
		>
			<nav className="flex flex-col w-full gap-16">
				<div className="w-full">
					<Link to={"/home"} className="md:hidden">
						<img className="w-42 md:w-48 h-auto" src="/assets/images/kirkeparkenLogo.svg" alt="logo" />
					</Link>
					<div className="grid-cols-2 md:grid-cols-4 grid gap-12 w-full mt-6">
						<FooterNavigation sections={footerLinks} isAdmin={true} adminLinks={adminLinks} />
						<Link to={"/home"} className="hidden md:block">
							<img
								className="w-42 md:w-48 h-auto"
								src="/assets/images/kirkeparkenLogo.svg"
								alt="logo"
							/>
						</Link>
					</div>
				</div>
				<div className="flex justify-between">
					<p className="text-sm font-md text-text-muted">
						&copy; {new Date().getFullYear()} Kirkeparken VGS, Filip Ryan S. Paulsen - All Rights
						Reserved.
					</p>
				</div>
			</nav>
		</footer>
	);
};

export default PageFooter;
