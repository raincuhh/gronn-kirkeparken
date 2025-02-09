import React from "react";
import HomeHero from "./homeHero";
import HomeAboutUs from "./homeAboutUs";
import HomeAnnouncementsPreviews from "./homeAnnouncementsPreviews";

const HomePage = (): React.JSX.Element => {
	return (
		<>
			<HomeHero />
			<HomeAboutUs />
			<HomeAnnouncementsPreviews />
		</>
	);
};

export default HomePage;
