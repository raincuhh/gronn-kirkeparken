import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RouteTypes } from "@/shared/types/routing";
import useAuth from "../../hooks/useAuth";

type RouteGuardProps = PropsWithChildren & { type?: RouteTypes };

const RouteGuard = ({ children, type }: RouteGuardProps): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, loading } = useAuth();

	useEffect(() => {
		console.log("RouteGuard triggered", { user, loading, type });
		if (loading) return;

		switch (type) {
			case RouteTypes.private:
				if (user && user.role !== "admin") {
					console.log("Redirecting: Not an admin");
					navigate("/401", { replace: true });
				}
				break;
			case RouteTypes.auth:
				if (user) {
					console.log("Redirecting: User is authenticated");
					navigate("/dashboard", { replace: true });
				}
				break;
			case RouteTypes.protected:
				if (!user) {
					console.log("Redirecting: No user found, going to login");
					navigate("/login", { state: { from: location }, replace: true });
				}
				break;
		}
	}, [user, loading, type, navigate, location.pathname]);

	return <>{children}</>;
};

export default RouteGuard;
