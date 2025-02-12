import React from "react";
import { RouterProvider } from "react-router-dom";
import websiteRouter from "./routes/routes";

const App = (): React.JSX.Element => {
	return (
		<>
			<RouterProvider router={websiteRouter} />
		</>
	);
};

export default App;
