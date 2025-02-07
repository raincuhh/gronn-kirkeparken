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
			description: [
				"Vi fremhever og støtter grønne prosjekter ved Kirkeparken VGS. Dette inkluderer alt fra resirkuleringsinitiativ og energisparende tiltak til grønne områder og bærekraftige løsninger i skolens hverdag.",
				"Vårt mål er å redusere skolens miljøavtrykk ved å implementere mer miljøvennlige alternativer, som for eksempel bruk av gjenbruksmaterialer og energieffektiv belysning.",
				"Vi samarbeider også med elever og ansatte for å finne nye måter å gjøre skolen mer bærekraftig på. Har du en god idé? Del den med oss!",
			],
		},
		{
			title: "📢 Kunngjøringer",
			description: [
				"Hold deg oppdatert på viktige miljønyheter, skoleinitiativer og kommende arrangementer. Vi deler jevnlig informasjon om hva som skjer på skolen når det gjelder bærekraft.",
				"Her vil du finne informasjon om kampanjer, prosjekter og spesielle temadager som skal øke bevisstheten rundt miljøet.",
				"Vi oppfordrer også elever og ansatte til å bidra med egne kunngjøringer og forslag til nye initiativer.",
			],
		},
		{
			title: "📸 Fotoalbum",
			description: [
				"Se og del bilder av miljøvennlige initiativer på skolen. Har klassen din plantet et tre eller deltatt i en ryddeaksjon? Last opp bilder og inspirer andre!",
				"Alle opplastede bilder må godkjennes av en administrator for å sikre at innholdet er relevant og bidrar til et positivt budskap.",
				"Bildegalleriet fungerer også som en visuell historikk over skolens miljøengasjement, slik at vi kan se fremgangen vi har gjort over tid.",
				"Vi håper at dette kan være en inspirasjonskilde for elever og ansatte til å ta enda flere miljøvennlige valg i hverdagen.",
			],
		},
		{
			title: "🛠 Bli med!",
			description: [
				"Som elev eller ansatt kan du aktivt bidra til et grønnere skolemiljø. Delta i våre prosjekter, last opp bilder, del ideer og engasjer deg i tiltak som gjør en forskjell.",
				"Vi ønsker å bygge et fellesskap der alle kan være med og ta ansvar for miljøet – enten det er gjennom små hverdagsvaner eller større prosjekter.",
				"Det er mange måter å bidra på, enten du vil hjelpe til med organisering av arrangementer, komme med forslag til forbedringer eller bare spre budskapet videre.",
				"Sammen kan vi skape en mer bærekraftig skolehverdag og vise at små handlinger kan føre til store endringer!",
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
					<p>
						GrønnKirkeparken er et initiativ ved Kirkeparken VGS som har som mål å øke bevisstheten
						rundt miljøspørsmål og fremme bærekraftige tiltak på skolen. Vi ønsker å inspirere elever og
						ansatte til å ta del i positive miljøendringer, både i hverdagen og på lang sikt.
					</p>
					<p className="!mt-4">
						Gjennom ulike prosjekter og aktiviteter håper vi å skape en mer miljøvennlig skolekultur,
						hvor alle føler ansvar for å bidra til et grønnere lokalsamfunn. Vårt engasjement strekker
						seg fra å redusere avfall og energiforbruk, til å fremme bruk av kollektivtransport og
						bærekraftige matvalg.
					</p>
				</header>
				<section>
					<h2 className="text-2xl font-lg !my-4">Hva gjør vi?</h2>
					<ul className="flex flex-col gap-4">
						<RenderList
							data={dropdownData}
							render={(item: DropdownItemData, i) => (
								<DropdownItem
									key={i}
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
					<p className="!mt-8 font-xl text-2xl md:text-3xl">💚 Bli med og gjør Kirkeparken grønnere!</p>
				</footer>
			</div>
		</div>
	);
};

export default HomeAboutUs;
