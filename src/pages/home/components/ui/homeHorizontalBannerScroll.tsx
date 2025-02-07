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
		<div className="flex md:flex-row my-16 h-16 md:h-24 w-full overflow-hidden relative">
			<div className="flex absolute w-full">
				<div className="flex items-center banner" style={{ ["--swipe-speed" as any]: `${speed}ms` }}>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={i} className="flex-none mr-16">
								<img
									className="min-h-16 md:min-h-24 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={i} className="flex-none mr-16">
								<img
									className="min-h-16 md:min-h-24 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={i} className="flex-none mr-16">
								<img
									className="min-h-16 md:min-h-24 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={i} className="flex-none mr-16">
								<img
									className="min-h-16 md:min-h-24 w-auto object-contain"
									src={item.img}
									alt={`Logo-${i}`}
								></img>
							</div>
						)}
					/>
					<RenderList
						data={images}
						render={(item, i) => (
							<div key={i} className="flex-none mr-16">
								<img
									className="min-h-16 md:min-h-24 w-auto object-contain"
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

{
	/* <div className="relative w-full overflow-hidden py-2 my-14">
			<div className="flex w-full items-center">
				<div
					className="flex banner items-center whitespace-nowrap gap-16 w-ful"
					style={{ ["--swipe-speed" as any]: `${speed}ms` }}
				>
					<RenderList
						data={images}
						render={(item) => (
							<div key={item.id} className="flex-none h-16">
								<img className="h-16 w-auto object-contain" src={item.img} alt="Logo" />
							</div>
						)}
					/>

					<RenderList
						data={images}
						render={(item) => (
							<div key={`clone-${item.id}`} className="flex-none h-16">
								<img className="h-16 w-auto object-contain" src={item.img} alt="Logo" />
							</div>
						)}
					/>
				</div>
			</div>
		</div> */
}
