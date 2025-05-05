const specialDays = [
	{
		date: "04-22",
		name: "Jordens dag",
		description:
			"Markeringen finner sted 22. april hvert år og skal rette oppmerksomheten mot alle miljøproblemer.",
		url: "https://www.earthday.org/",
	},
	{
		date: "06-05",
		name: "Verdens miljøverndag (WED)",
		description: "Verdens miljøverndag er 5. juni, og fokuserer på miljøbevissthet globalt.",
		url: "https://www.worldenvironmentday.global/",
	},
	{
		date: "01-15",
		name: "Miljø Norge stiftelsesdag",
		description: "Miljø Norge ble stiftet 15. januar 2021 og fokuserer på industriavfall og gjenvinning.",
		url: "https://www.miljonorge.no/",
	},
	{
		date: "11-13",
		name: "Stiftelsen Miljøfyrtårn",
		description: "Stiftelsen Miljøfyrtårn ble dannet 13. november 2003.",
		url: "https://www.miljofyrtarn.no/",
	},
];

const EnvironmentalDate = () => {
	const today = new Date();
	const dateString = today.toLocaleDateString("nb-NO", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");
	const todayKey = `${month}-${day}`;

	const special = specialDays.find((d) => d.date === todayKey);
	// const special = specialDays[0];

	return (
		<div className="p-4 flex items-center justify-center flex-col">
			<h2 className="text-xl font-bold">📅 {dateString}</h2>
			{special && (
				<div className="mt-4 p-4 rounded-md bg-primary-alt">
					<h3 className="font-bold mb-2">🌿 {special.name}</h3>
					<p>{special.description}</p>
					<a href={special.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
						Les mer her →
					</a>
				</div>
			)}
		</div>
	);
};

export default EnvironmentalDate;
