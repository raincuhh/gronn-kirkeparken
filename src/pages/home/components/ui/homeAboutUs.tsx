import React from "react";

const HomeAboutUs = (): React.JSX.Element => {
	return (
		<div id="about-us" className="md:px-16 px-4 flex w-full max-w-[1020px] mx-auto items-center">
			<div className="flex flex-col gap-8 ">
				<header className="mt-16">
					<p className="text-lg">Om oss - GrønnKirkeparken</p>
					<h2 className="text-md">Sammenn for en grønnere skolehverdag!</h2>
					<h1 className="text-2xl mb-4">Hvem er vi?</h1>
					<img
						src="./assets/images/kirkeparkenUtsiden.png"
						alt="img"
						className="bg-cover bg-local bg-center h-[5rem]"
					/>
					<p className="">
						GrønnKirkeparken er et initiativ ved Kirkeparken VGS som har som mål å øke bevisstheten
						rundt miljøspørsmål og fremme bærekraftige tiltak på skolen. Vi ønsker å inspirere elever og
						ansatte til å ta del i positive miljøendringer.
					</p>
				</header>
				<section>
					<h1>Hva gjør vi? (placeholder stuff for nå)</h1>
					<ul>
						<li>🏫 Miljøtiltak - Vi fremhever og støtter grønne prosjekter ved Kirkeparken VGS.</li>
						<li>
							📢 Kunngjøringer - Hold deg oppdatert på viktige miljønyheter, skoleinitiativer og
							kommende arrangementer.
						</li>
						<li>
							📸 Fotoalbum - Se og del bilder av miljøvennlige initiativer på skolen. Alle opplastede
							bilder må godkjennes av en administrator.
						</li>
						<li>
							🛠 Bli med! - Som elev eller ansatt kan du bidra ved å laste opp bilder, lese
							kunngjøringer og delta i grønne tiltak.
						</li>
					</ul>
				</section>
				<footer>
					<h1>Vår visjon</h1>
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
