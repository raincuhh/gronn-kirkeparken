import React from "react";

const HomeHero = (): React.JSX.Element => {
	return (
		<div className="relative h-[85vh] pt-4 overflow-hidden w-full flex justify-center items-center ">
			<div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-fixed bg-center h-full w-full">
				<div className=" w-full flex-col lg:flex-row gap-8 lg:gap-16 mx-auto flex items-center justify-center h-full px-4">
					<div className="bg-primary rounded-md h-[22rem] md:max-w-2xl md:w-[50rem] w-full px-8 py-4">
						<header className="text-4xl font-lg mb-6">Grønt skifte på Kirkeparken VGS 🌍</header>
						<p className="text-text-muted">
							Kirkeparken VGS er et Miljøfyrtårn og jobber for en bærekraftig skolehverdag. Les om våre
							initiativer, bidra med ideer, og følg miljøarbeidet vårt - sammen gjør vi en forskjell!
						</p>
						<div className="flex gap-4">
							<button></button>
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
			</div>
		</div>
	);
};

export default HomeHero;
