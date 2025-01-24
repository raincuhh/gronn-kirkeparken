import {
  BrowserRouter as Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouteObject,
} from "react-router-dom";

import RouteList from "./routeList";
import ErrorBoundary from "../../shared/components/utils/errorBoundary";

const websiteRouter = createBrowserRouter(
  createRoutesFromElements(
    
      // <Route errorElement={<ErrorBoundary />}>
      //     {RouteList.map((route: RouteObject, index: number) => (
              
      //     ))}
      // </Route>
  )
);

export default websiteRouter;
