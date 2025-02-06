import Button from "@/shared/components/ui/button";
import React from "react";

const HomeHero = (): React.JSX.Element => {
	return (
		<div className="relative h-[calc(100dvh-6rem)] md:h-[100dvh] pt-8 md:pt-16  overflow-hidden w-full flex flex-col justify-center items-center">
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
			<div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-local bg-center h-full w-full"></div>

			{/* <div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-local bg-center h-full w-full">
				<div className=" w-full flex-col lg:flex-row gap-8 lg:gap-16 mx-auto flex items-center justify-center h-full px-4">
					<div className="bg-primary rounded-md h-[22rem] md:max-w-2xl md:w-[50rem] w-full px-8 py-8 flex flex-col justify-between">
						<div className="flex flex-col items-center">
							<header className="md:text-3xl text-2xl font-xl mb-4 sm:mb-4">
								Grønt skifte på Kirkeparken VGS
							</header>
							<p className="text-text-muted md:text-lg text-md">
								Kirkeparken VGS er et Miljøfyrtårn og jobber for en bærekraftig skolehverdag. Les om
								våre initiativer, bidra med ideer, og følg miljøarbeidet vårt - sammen gjør vi en
								forskjell!
							</p>
						</div>
						<div className="flex gap-4 ">
							<Button>Les mer</Button>
						</div>
					</div>
					<div className="flex flex-col gap-12">
						<img
							className="min-w-[14rem] md:min-w-[17rem] h-auto"
							src="./assets/images/logoOstfoldFylkesKommune.svg"
							alt="kirkeparken"
						/>
						<img
							className="min-w-[14rem] md:min-w-[20rem] h-auto"
							src="./assets/images/miljofyrtarnLogo2.svg"
							alt="kirkeparken"
						/>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default HomeHero;
