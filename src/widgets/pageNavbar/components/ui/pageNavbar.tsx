import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

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
					"w-full fixed z-[110] border-solid border-b-base-10 border-b-[0px]",
					hasScrolled ? "bg-primary border-b-[1px]" : "bg-transparent"
				)}
			>
				<div className="md:px-16 px-8 flex flex-row md:h-16 justify-between w-full items-center">
					<div className="gap-6 flex items-center">
						<Link to={"/home"}>
							{/* <img className="md:w-32 w-24" src="/assets/images/miljofyrtarnBrand.png" alt="logo" /> */}
							placeholder
						</Link>
						<div className="w-fit flex gap-4 items-center">
							<nav className="hidden md:flex gap-4">
								<li>placeholder</li>
								<li>placeholder</li>
								<li>placeholder</li>
							</nav>
						</div>
					</div>
					<div>placeholder</div>
				</div>
			</header>
			<div className="pb-20"></div>
		</>
	);
};

export default PageNavbar;
