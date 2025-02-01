import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/button";

// type PageNavbarProps = { isPrivateRoute: boolean };

const PageNavbar = (): React.JSX.Element => {
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			setHasScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<header
				className={clsx(
					"w-full fixed z-[110] border-solid border-b-modifier-border-color border-b-[0px]",
					hasScrolled ? "bg-primary border-b-[1px]" : "bg-transparent"
				)}
			>
				<div className="md:px-16 px-8 flex flex-row h-16 justify-between w-full max-w-[1440px] mx-auto items-center">
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
							<li>
								<div className="px-2 py-1 hover:bg-accent border-solid border-modifier-border-color bg-base-5 border-[1px] transition-colors duration-100 ease-in-out rounded-md">
									Dashboard
								</div>
							</li>
							<li>
								<Button
									size="sm"
									rounded={"md"}
									variant="outline"
									onClick={() => console.log("click")}
								>
									dashboard
								</Button>
							</li>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
};

export default PageNavbar;
