import DropdownItem, { DropdownItemData } from "@/shared/components/ui/dropdownItem";
import RenderList from "@/shared/components/utils/renderList";
import React, { useState } from "react";

// lag li tingene inni en dropdown med delen før - inni tittelen.

const HomeAboutUs = (): React.JSX.Element => {
	const [openDropdowns, setopenDropdowns] = useState<number[]>([]);

	const toggleDropdown = (i: number) => {
		setopenDropdowns((prev) => (prev.includes(i) ? prev.filter((j) => j !== i) : [...prev, i]));
	};

	const dropdownData: DropdownItemData[] = [
		{
			title: "🏫 Miljøtiltak",
			description: ["Vi fremhever og støtter grønne prosjekter ved Kirkeparken VGS."],
		},
		{
			title: "📢 Kunngjøringer",
			description: [
				"Hold deg oppdatert på viktige miljønyheter, skoleinitiativer og kommende arrangementer.",
			],
		},
		{
			title: "📸 Fotoalbum",
			description: [
				"Se og del bilder av miljøvennlige initiativer på skolen. Alle opplastede bilder må godkjennes av en administrator.",
			],
		},
		{
			title: "🛠 Bli med!",
			description: [
				"Som elev eller ansatt kan du bidra ved å laste opp bilder, lese kunngjøringer og delta i grønne tiltak.",
			],
		},
	];

	return (
		<div id="about-us" className="md:px-16 px-4 flex w-full mt-16 max-w-[1020px] mx-auto items-center">
			<div className="flex flex-col gap-8 ">
				<header>
					<p className="text-text-muted">Om oss - GrønnKirkeparken</p>
					<h1 className="text-3xl font-lg !my-4">Sammen for en grønnere skolehverdag!</h1>
					<div className="bg-[url('./assets/images/kirkeparkenUtsiden2.jpg')] bg-cover bg-local bg-center rounded-sm my-8 w-full h-[20rem] md:h-[25rem]"></div>
					<h2 className="text-2xl font-lg !my-4">Hvem er vi?</h2>
					<p className="">
						GrønnKirkeparken er et initiativ ved Kirkeparken VGS som har som mål å øke bevisstheten
						rundt miljøspørsmål og fremme bærekraftige tiltak på skolen. Vi ønsker å inspirere elever og
						ansatte til å ta del i positive miljøendringer.
					</p>
				</header>
				<section>
					<h2 className="text-2xl font-lg !my-4">Hva gjør vi?</h2>
					<ul className="flex flex-col gap-2">
						<RenderList
							data={dropdownData}
							render={(item: DropdownItemData, i) => (
								<DropdownItem
									data={item}
									idx={i}
									openDropdowns={openDropdowns}
									toggleDropDown={toggleDropdown}
								/>
							)}
						/>
					</ul>
				</section>
				<footer>
					<h2 className="text-2xl font-lg !my-4">Vår visjon</h2>
					<p>
						Vi tror at små handlinger kan føre til store endringer. Gjennom GrønnKirkeparken ønsker vi å
						skape et mer miljøbevisst skolesamfunn hvor alle kan gjøre en forskjell.
					</p>
					<p>💚 Bli med og gjør Kirkeparken grønnere!</p>
				</footer>
			</div>
		</div>
	);
};

export default HomeAboutUs;
