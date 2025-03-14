import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RouteTypes } from "@/shared/types/routing";
import useAuth from "../../hooks/useAuth";

type RouteGuardProps = PropsWithChildren & { type?: RouteTypes };

const RouteGuard = ({ children, type = RouteTypes.protected }: RouteGuardProps): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	useEffect(() => {
		switch (type) {
			case RouteTypes.private:
				// if authenticated and role != admin.
				// redirect with a 401 error no autherization
				break;
			case RouteTypes.auth:
				// if not authenticated and route is auth, stay.
				// if authenticated, redirect to dashboard.
				break;
			case RouteTypes.protected:
				// if not authenticated and route is protected route,
				// redirect to auth route.
				break;
			case RouteTypes.public:
			default:
				break;
		}
	}, []);

	return <>{children}</>;
};

export default RouteGuard;
