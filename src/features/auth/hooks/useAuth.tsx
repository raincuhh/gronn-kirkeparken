import { User } from "@/shared/types/general";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextProps = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	register: (email: string, password: string, first_name: string, last_name: string) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}

	return context;
};

export default useAuth;
