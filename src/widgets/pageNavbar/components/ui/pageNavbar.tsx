import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/button";
import HamburgerMenuIcon from "@/shared/components/icons/hamburgerMenuIcon";
import HamburgerMenuClosedIcon from "@/shared/components/icons/hamburgerMenuClosedIcon";

// type PageNavbarProps = { isPrivateRoute: boolean };

const PageNavbar = (): React.JSX.Element => {
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

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

	return (
		<>
			<header
				className={clsx(
					"w-full fixed z-[110] border-solid border-b-modifier-border-color border-b-[0px] flex flex-col",
					hasScrolled && !isOpen
						? "bg-primary border-b-[1px] border-b-modifier-border-color"
						: "bg-transparent border-b-0"
				)}
			>
				<div className="md:px-16 px-4 flex flex-row h-16 justify-between w-full max-w-[1440px] mx-auto items-center">
					<div className="gap-6 flex items-center">
						<Link to={"/home"}>
							<img
								className=" w-42 md:46 h-auto"
								src="/assets/images/kirkeparkenLogo.svg"
								alt="logo"
							/>
						</Link>
						<div className="w-fit flex gap-4 items-center">
							<nav className="hidden md:flex gap-4 text-text-muted">test</nav>
						</div>
					</div>
					<div className="flex items-center">
						<nav className="hidden md:flex gap-4">
							<Button rounded={"full"} size={"md"} href={"/register"}>
								Create an Account
							</Button>
							<Button variant={"outline"} href={"/login"}>
								Log in
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
						<div className="py-4 px-4 flex w-full flex-col gap-8 text-lg font-md">
							<nav className="w-full gap-4 flex flex-col">
								<Button size={"lg"} variant={"base"} href={"/register"} className="w-full">
									Create an account
								</Button>
								<Button size={"lg"} className="w-full" variant={"outline"}>
									Log in
								</Button>
							</nav>
							<nav className="w-full flex flex-col border-b-[1px] border-modifier-border-color pb-4">
								<Button variant={"ghost"} size={"lg"} className=" flex justify-start">
									type shit
								</Button>
								<Button variant={"ghost"} size={"lg"} className=" flex justify-start">
									more testing
								</Button>
							</nav>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PageNavbar;
