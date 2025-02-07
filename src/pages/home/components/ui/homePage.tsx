import React from "react";
import HomeHero from "./homeHero";
import HomeAboutUs from "./homeAboutUs";
import HomeAnnouncementsPreview from "./homeAnnouncementsPreview";

const HomePage = (): React.JSX.Element => {
	return (
		<>
			<HomeHero />
			<HomeAboutUs />
			<HomeAnnouncementsPreview />
		</>
	);
};

export default HomePage;
