import Button from "@/shared/components/ui/button";
import React from "react";
import HomeHorizontalBannerScroll from "./homeHorizontalBannerScroll";
import LinkExternalIcon from "@/shared/components/icons/linkExternalIcon";
import useModal from "@/shared/hooks/useModal";
import { Modal } from "@/shared/types/modal";

const HomeHero = (): React.JSX.Element => {
	const { open, remove } = useModal();

	const handleOpenModal = () => {
		const modalContent: Modal = {
			id: "about-us-test",
			content: (
				<div className="flex flex-col gap-4">
					<header>Yokoso, watashi no SOUL SOCIETY.</header>
					<Button onClick={() => remove()} className="font-lg">
						Lukk
					</Button>
				</div>
			),
		};

		open(modalContent);
	};

	return (
		<div
			id="hero"
			className="relative min-h-[calc(100dvh-6rem)] pt-24 md:pt-48 overflow-hidden w-full flex flex-col justify-center items-center bg-[url('/assets/images/gradientBakgrunnHero.svg')] bg-cover bg-[30%] md:bg-[-10%]"
		>
			<div className="px-4 pt-4 mb-16 flex flex-col justify-center items-center">
				<header className="md:text-3xl lg:text-4xl text-2xl font-xl text-center mb-4">
					Grønt skifte på Kirkeparken VGS
				</header>
				<p className="text-text-muted text-lg lg:text-xl text-center max-w-lg md:max-w-xl lg:max-w-2xl">
					Kirkeparken VGS er et Miljøfyrtårn og jobber for en bærekraftig skolehverdag. Les om våre
					initiativer, bidra med ideer, og følg miljøarbeidet vårt - sammen gjør vi en forskjell!
				</p>
				<div className="flex gap-4 mt-8 font-lg">
					<Button rounded={"full"} size={"md"} onClick={handleOpenModal} className="font-xl">
						om oss
					</Button>
					<Button
						rounded={"full"}
						size={"md"}
						variant={"base"}
						href={"https://www.miljofyrtarn.no/miljoledelse/"}
						className="flex gap-2 bg-primary hover:!bg-primary-alt !text-text-normal font-xl"
					>
						<p>Les om Miljøfyrtårnet</p>
						<LinkExternalIcon className="!h-4 !w-4 fill-text-normal" />
					</Button>
				</div>
			</div>
			<div className="bg-[url('/assets/images/norwayNaturePlaceholder1920x1080.jpg')] bg-cover bg-local bg-center min-h-[50dvh] h-[31rem] w-full"></div>
			<div className="mb-6 mt-12 w-full flex justify-center px-4">
				<p className=" text-xl font-xl text-center max-w-lg md:max-w-xl lg:max-w-3xl">
					Kirkeparken VGS er en miljøbevisst skole som fremmer bærekraft, engasjement og grønn utvikling.
				</p>
			</div>
			<HomeHorizontalBannerScroll speed={10000} />
		</div>
	);
};

export default HomeHero;
