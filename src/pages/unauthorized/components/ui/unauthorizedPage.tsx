import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
	return (
		<div className="h-dvh flex justify-center items-center mt-16">
			<div className="flex flex-col items-center justify-center">
				<div className="mb-2 text-center font-xl text-text-faint">401</div>
				<header className="flex flex-col gap-4 text-center">
					<h1 className="text-xl font-xl sm:text-2xl">Ingen tillatelse.</h1>
					<p className="text-text-muted font-md">
						Du har ikke tillatelse til å få tilgang til denne siden.
					</p>
				</header>
				<div className="mt-2 text-text-accent hover:text-text-accent-hover text-lg font-md">
					<Link to={"/home"}>Gå tilbake til hjem.</Link>
				</div>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
