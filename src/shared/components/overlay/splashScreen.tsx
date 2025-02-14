import React from "react";

const SplashScreen = (): React.JSX.Element => {
	return (
		<div className="fixed flex flex-col min-w-full min-h-full overflow-hidden pointer-events-none select-none z-120">
			<div className="flex h-dvh w-dvw bg-primary items-center justify-center">
				<img className="w-48 h-48 object-cover" src="/assets/images/kirkeparkenLogo.svg" alt="logo" />
			</div>
		</div>
	);
};

export default SplashScreen;
