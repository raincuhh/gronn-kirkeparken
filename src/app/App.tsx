import React from "react";
import { RouterProvider } from "react-router-dom";
import websiteRouter from "./routes/routes";
import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import ModalProvider from "./providers/modalProvider";
import ModalRoot from "@/shared/components/utils/modalRoot";

const App = (): React.JSX.Element => {
	const baseColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary").trim();

	const highlightColor = getComputedStyle(document.documentElement)
		.getPropertyValue("--color-secondary-alt")
		.trim();

	return (
		<>
			<ModalProvider>
				<SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
					<RouterProvider router={websiteRouter} />
					<ModalRoot />
				</SkeletonTheme>
			</ModalProvider>
		</>
	);
};

export default App;
