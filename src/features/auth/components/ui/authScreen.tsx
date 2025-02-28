import React from "react";

type AuthScreenProps = {
	type: "login" | "register";
};

const AuthScreen = ({ type }: AuthScreenProps): React.JSX.Element => {
	return (
		<div
			id={"auth-" + type}
			className="flex flex-col justify-between items-center mt-16 md:mt-48 overflow-hidden w-full h-full min-h-[calc(100dvh-4rem)]"
		>
			<div className="md:px-16 px-4 flex w-full mt-4 max-w-[1140px] h-full">eeeee</div>
			<div className="md:px-16 px-4 py-8 border-solid border-t h-full w-full flex justify-center items-center">
				<div></div>
			</div>
		</div>
	);
};

export default AuthScreen;
