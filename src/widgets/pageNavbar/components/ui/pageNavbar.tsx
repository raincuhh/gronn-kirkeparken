import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Button from "@/shared/components/ui/button";
import HamburgerMenuIcon from "@/shared/components/icons/hamburgerMenuIcon";
import HamburgerMenuClosedIcon from "@/shared/components/icons/hamburgerMenuClosedIcon";

// type PageNavbarProps = { isPrivateRoute: boolean };

const PageNavbar = (): React.JSX.Element => {
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const location = useLocation();
	const [locationNavigation, setLocationNavigation] = useState<React.JSX.Element | null>(null);

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

		switch (location.pathname) {
			case "/home":
				setLocationNavigation(
					<>
						<Button
							variant="ghost"
							size="lg"
							href="/announcements"
							onClick={() => setIsOpen(false)}
							className="flex justify-start !text-text-normal"
						>
							Kunngjøringer
						</Button>
						<Button
							variant="ghost"
							size="lg"
							href="/image-gallery"
							onClick={() => setIsOpen(false)}
							className="flex justify-start !text-text-normal"
						>
							Bildegalleri
						</Button>
					</>
				);
				break;
			case "/announcements":
				setLocationNavigation(
					<>
						<Button
							variant="ghost"
							size="lg"
							href="/image-gallery"
							onClick={() => setIsOpen(false)}
							className="flex justify-start !text-text-normal"
						>
							Bildegalleri
						</Button>
						<Button
							variant="ghost"
							size="lg"
							href="/home"
							onClick={() => setIsOpen(false)}
							className="flex justify-start !text-text-normal"
						>
							Hjem
						</Button>
					</>
				);
				break;
			default:
				setLocationNavigation(null);
				break;
		}
	}, [location.pathname]);

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
							<nav className="hidden media-min-w-800:flex text-text-muted">
								<li className="!py-1 !px-4 hover:bg-base-30 hover:text-base-00 text-center rounded-full items-center w-full h-full list-none">
									<Link to={"/announcements"}>Kunngjøringer</Link>
								</li>
								<li className="!py-1 !px-4 hover:bg-base-30 hover:text-base-00 text-center rounded-full items-center w-full h-full list-none">
									<Link to={"/image-gallery"}>Bildegalleri</Link>
								</li>
							</nav>
						</div>
					</div>
					<div className="flex items-center">
						<nav className="hidden md:flex gap-4">
							<Button variant={"base"} href={"/register"}>
								Registrer deg
							</Button>
							<Button variant={"outline"} href={"/login"}>
								Logg inn
							</Button>
						</nav>
						<div
							className="p-1 rounded-full border-solid border-[1px] border-modifier-border-color md:hidden hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default"
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
								<Button size={"lg"} variant={"base"} href={"/register"} className="w-full font-lg">
									Registrer deg
								</Button>
								<Button size={"lg"} variant={"outline"} href={"/login"} className="w-full font-lg">
									Logg in
								</Button>
							</nav>
							<nav className="w-full flex flex-col border-b-[1px] border-modifier-border-color pb-4 mb-4">
								<Button variant={"ghost"} size={"lg"} className="flex justify-start">
									type shit
								</Button>
								<Button variant={"ghost"} size={"lg"} className="flex justify-start">
									more testing
								</Button>
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
