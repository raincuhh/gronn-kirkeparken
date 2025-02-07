import Button from "@/shared/components/ui/button";
import React from "react";
import HomeHorizontalBannerScroll from "./homeHorizontalBannerScroll";

const HomeHero = (): React.JSX.Element => {
	return (
		<div className="relative min-h-[calc(100dvh-6rem)]  pt-8 md:pt-16  overflow-hidden w-full flex flex-col justify-center items-center">
			<div className="px-4 mb-16 flex flex-col justify-center items-center">
				<header className="md:text-3xl text-2xl font-xl text-center mb-2">
					Grønt skifte på Kirkeparken VGS
				</header>
				<p className="text-text-muted md:text-lg text-md text-center max-w-lg">
					Kirkeparken VGS er et Miljøfyrtårn og jobber for en bærekraftig skolehverdag. Les om våre
					initiativer, bidra med ideer, og følg miljøarbeidet vårt - sammen gjør vi en forskjell!
				</p>
				<div className="flex gap-4 mt-4">
					<Button rounded={"full"} size={"md"}>
						Les om oss
					</Button>
					<Button rounded={"full"} size={"md"} variant={"outline"}>
						Les om Miljøfyrtårnet
					</Button>
				</div>
			</div>
			<div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-local bg-center min-h-[50dvh] h-[40rem] w-full"></div>
			<HomeHorizontalBannerScroll speed={10000} />
		</div>
	);
};

export default HomeHero;
