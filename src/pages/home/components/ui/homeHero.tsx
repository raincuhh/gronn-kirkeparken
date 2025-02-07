import Button from "@/shared/components/ui/button";
import React from "react";
import HomeHorizontalBannerScroll from "./homeHorizontalBannerScroll";
import LinkExternalIcon from "@/shared/components/icons/linkExternalIcon";

const HomeHero = (): React.JSX.Element => {
	return (
		<div
			id="hero"
			className="relative min-h-[calc(100dvh-6rem)]  pt-16 md:pt-48  overflow-hidden w-full flex flex-col justify-center items-center bg-[url('/assets/images/gradientBakgrunnHero.svg')] bg-cover "
		>
			<div className="px-4 pt-4 mb-16 flex flex-col justify-center items-center">
				<header className="md:text-3xl text-2xl font-xl text-center mb-2">
					Grønt skifte på Kirkeparken VGS
				</header>
				<p className="text-text-muted md:text-lg text-md text-center max-w-lg">
					Kirkeparken VGS er et Miljøfyrtårn og jobber for en bærekraftig skolehverdag. Les om våre
					initiativer, bidra med ideer, og følg miljøarbeidet vårt - sammen gjør vi en forskjell!
				</p>
				<div className="flex gap-4 mt-4 font-lg">
					<Button rounded={"full"} size={"md"} href="#about-us">
						om oss
					</Button>
					<Button
						rounded={"full"}
						size={"md"}
						variant={"outline"}
						href={"https://www.miljofyrtarn.no/miljoledelse/"}
						className="flex gap-2  !hover:bg-secondary-alt"
					>
						<p>Les om Miljøfyrtårnet</p>
						<LinkExternalIcon className="!h-4 !w-4 fill-text-normal" />
					</Button>
				</div>
			</div>
			<div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-local bg-center min-h-[50dvh] h-[31rem] w-full"></div>
			<HomeHorizontalBannerScroll speed={10000} />
		</div>
	);
};

export default HomeHero;
