import React from "react";
import HomeHero from "./homeHero";
import HomeAboutUs from "./homeAboutUs";

const HomePage = (): React.JSX.Element => {
	return (
		<>
			<HomeHero />
			<HomeAboutUs />
		</>
	);
};

export default HomePage;
