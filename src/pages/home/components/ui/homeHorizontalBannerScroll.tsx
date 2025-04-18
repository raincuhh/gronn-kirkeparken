import RenderList from "@/shared/components/utils/renderList";
import React from "react";

const images = [
	"./assets/images/miljofyrtarnLogo2.svg",
	"./assets/images/kirkeparkenLogo.svg",
	"./assets/images/logoOstfoldFylkesKommune.svg",
].map((img) => ({ id: crypto.randomUUID(), img }));

type HomeHorizontalBannerScrollProps = {
	speed: number;
};

const HomeHorizontalBannerScroll = ({ speed = 5000 }: HomeHorizontalBannerScrollProps): React.JSX.Element => {
	return (
		<div className="flex md:flex-row my-16 h-12 md:h-18 w-full overflow-hidden relative">
			<div className="flex absolute w-full">
				<div className="flex items-center banner" style={{ ["--swipe-speed" as any]: `${speed}ms` }}>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={item.id} className="flex-none mr-16">
								<img
									className="min-h-12 md:min-h-18 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={item.id} className="flex-none mr-16">
								<img
									className="min-h-12 md:min-h-18 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={item.id} className="flex-none mr-16">
								<img
									className="min-h-12 md:min-h-18 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={item.id} className="flex-none mr-16">
								<img
									className="min-h-12 md:min-h-18 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={item.id} className="flex-none mr-16">
								<img
									className="min-h-12 md:min-h-18 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeHorizontalBannerScroll;
