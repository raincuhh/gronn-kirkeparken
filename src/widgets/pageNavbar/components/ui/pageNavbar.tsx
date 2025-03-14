import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Button from "@/shared/components/ui/button";
import HamburgerMenuIcon from "@/shared/components/icons/hamburgerMenuIcon";
import HamburgerMenuClosedIcon from "@/shared/components/icons/hamburgerMenuClosedIcon";
import useAuth from "@/features/auth/hooks/useAuth";
import ProfilePicture from "@/shared/components/ui/profilePicture";
import { supabase } from "@/shared/lib/services";
import { isAdmin } from "@/shared/lib/utils";
import RenderList from "@/shared/components/utils/renderList";

const navLinks = {
	"/home": [
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Bildegalleri", href: "/image-gallery" },
	],
	"/announcements": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Hjem", href: "/home" },
	],
	"/image-gallery": [
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
	"/login": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
	"/register": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
	"/dashboard": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
	"/dashboard/photo-approvals": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
	"/dashboard/announcements": [
		{ title: "Bildegalleri", href: "/image-gallery" },
		{ title: "Kunngjøringer", href: "/announcements" },
		{ title: "Hjem", href: "/home" },
	],
};

const adminLinks = [
	{ title: "Godkjenn bilder", href: "/dashboard/photo-approvals" },
	{ title: "Administrer kunngjøringer", href: "/dashboard/announcements" },
];

const PageNavbar = (): React.JSX.Element => {
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const location = useLocation();
	const [locationNavigation, setLocationNavigation] = useState<React.JSX.Element | null>(null);
	const { user, logout, loading } = useAuth();
	const [email, setEmail] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			setHasScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => document.body.classList.remove("overflow-hidden");
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);

		const pathname = location.pathname as keyof typeof navLinks;
		const links = navLinks[pathname] || null;
		if (links) {
			const filteredAdminLinks = adminLinks.filter((link) => {
				if (
					link.href === "/dashboard/photo-approvals" &&
					location.pathname === "/dashboard/photo-approvals"
				) {
					return false;
				}
				if (
					link.href === "/dashboard/announcements" &&
					location.pathname === "/dashboard/announcements"
				) {
					return false;
				}
				return true;
			});

			const navigationLinks = [...links, ...(isAdmin(user) ? filteredAdminLinks : [])];

			setLocationNavigation(
				<>
					<RenderList
						data={navigationLinks}
						render={(item: { title: string; href: string }) => (
							<>
								<Button
									key={item.href}
									variant="ghost"
									size="lg"
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="flex justify-start !text-text-normal"
								>
									{item.title}
								</Button>
							</>
						)}
					/>
				</>
			);
		} else {
			setLocationNavigation(null);
		}
	}, [location.pathname, isAdmin(user)]);

	useEffect(() => {
		if (loading) return;
		const fetchEmail = async () => {
			const { data, error } = await supabase.auth.getUserIdentities();

			if (error) {
				console.error("Error fetching email: ", error);
				setEmailError("Feil å hente E-Post");
				return;
			}

			setEmail(data.identities[0].identity_data?.email);
		};

		fetchEmail();
	}, [loading, user]);

	return (
		<>
			<header
				className={clsx(
					"w-full fixed z-[110] border-solid flex flex-col transition-colors  ease-in-out",
					{
						"bg-primary border-b-[1px] border-b-modifier-border-color duration-0":
							hasScrolled && !isOpen,
						"bg-transparent border-b-0 duration-100": !hasScrolled || isOpen,
					}
				)}
			>
				<div
					className={clsx(
						"absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out -z-10",
						hasScrolled ? "opacity-100" : "opacity-0"
					)}
				/>

				<div className="md:px-16 px-4 flex flex-row h-16 justify-between w-full max-w-[1440px] mx-auto items-center">
					<div className="gap-6 flex items-center">
						<Link to={"/home"}>
							<img
								className=" w-42 md:46 h-auto"
								src="/assets/images/kirkeparkenLogo.svg"
								alt="logo"
							/>
						</Link>
						<div className="w-fit flex items-center">
							<nav className="hidden md:flex text-text-muted">
								<li className="!py-1 !px-4 hover:bg-base-30 hover:text-base-00 text-center rounded-full items-center w-full h-full list-none transition-colors duration-100 ease-in-out">
									<Link to={"/announcements"}>Kunngjøringer</Link>
								</li>
								<li className="!py-1 !px-4 hover:bg-base-30 hover:text-base-00 text-center rounded-full items-center w-full h-full list-none transition-colors duration-100 ease-in-out">
									<Link to={"/image-gallery"}>Bildegalleri</Link>
								</li>
							</nav>
						</div>
					</div>
					<div className="flex items-center">
						<nav className="hidden lg:flex gap-4">
							{user !== null ? (
								<>
									<Button variant={"outline"} href={"/dashboard"}>
										Dashboard
									</Button>
									<ProfilePicture />
								</>
							) : (
								<>
									<Button variant={"base"} href={"/register"}>
										Registrer deg
									</Button>
									<Button variant={"outline"} href={"/login"}>
										Logg inn
									</Button>
								</>
							)}
						</nav>
						<div
							className="p-1 rounded-full border-solid border-[1px] border-modifier-border-color lg:hidden hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default"
							onClick={() => setIsOpen((prev) => !prev)}
						>
							{!isOpen ? (
								<HamburgerMenuIcon className="!h-6 !w-6 fill-text-normal" />
							) : (
								<HamburgerMenuClosedIcon className="!h-6 !w-6 fill-text-normal" />
							)}
						</div>
					</div>
				</div>
			</header>
			{isOpen && (
				<>
					<div className="fixed inset-0 z-[109] bg-primary flex pt-16 w-full">
						<div className="py-4 px-4 flex w-full flex-col text-lg font-md">
							<nav className="w-full gap-4 flex flex-col mb-4">
								{user !== null ? (
									<>
										<Button size={"lg"} variant={"base"} href={"/dashboard"}>
											Dashboard
										</Button>
									</>
								) : (
									<>
										<Button
											size={"lg"}
											variant={"base"}
											href={"/register"}
											className="w-full font-lg"
										>
											Registrer deg
										</Button>
										<Button
											size={"lg"}
											variant={"outline"}
											href={"/login"}
											className="w-full font-lg"
										>
											Logg in
										</Button>
									</>
								)}
							</nav>
							<nav className="w-full flex flex-col border-b-[1px] border-modifier-border-color pb-4 mb-4">
								{user !== null ? (
									<>
										<Button
											onClick={() => logout()}
											variant={"outline"}
											size={"lg"}
											className="flex justify-center"
										>
											Logg ut
										</Button>
										<Button variant={"ghost"} size={"lg"} className="flex justify-start mt-4">
											Email: {email !== null ? email : emailError}
										</Button>
									</>
								) : (
									<></>
								)}
							</nav>
							<nav className="flex flex-col">{locationNavigation}</nav>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PageNavbar;
