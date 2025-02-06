import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): React.JSX.Element => {
	return (
		<div className="flex w-full h-[calc(100dvh-6rem)] justify-center items-center">
			<div className="flex flex-col items-center justify-center">
				<div className="mb-2 text-center font-xl text-text-faint">404</div>
				<header className="flex flex-col gap-4 text-center">
					<h1 className="text-xl font-xl sm:text-2xl">You found an unresolved link.</h1>
					<p className="text-text-muted font-md">
						We would note this, but we dont track visitors. If something seems wrong, feel free to
						contact{" "}
						<span className="">
							<Link to={""}>support</Link>
						</span>
						.
					</p>
				</header>
				<div className="mt-2 text-text-accent hover:text-text-accent-hover text-md font-md">
					<Link to={"/home"}>Go back to home.</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
