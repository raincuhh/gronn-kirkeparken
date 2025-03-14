import { useState, useEffect, PropsWithChildren, useMemo } from "react";
import { supabase } from "@/shared/lib/services";
import { User, UserRoles } from "@/shared/types/general";
import { AuthContext } from "@/features/auth/hooks/useAuth";

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { data: authSession } = await supabase.auth.getSession();
			setSession(authSession?.session?.access_token || null);

			if (authSession?.session?.user) {
				const { data, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("user_id", authSession.session.user.id)
					.single();

				if (error) {
					console.error("Error fetching fetching user:", error);
					return;
				}

				setUser(data);
			}
		};

		fetchUser();

		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session?.access_token || null);
			if (!session) {
				setUser(null);
			} else {
				fetchUser();
			}
		});

		return () => {
			authListener?.subscription?.unsubscribe();
		};
	}, []);

	const register = async (email: string, password: string, first_name: string, last_name?: string) => {
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) throw error;

		if (data.user) {
			await supabase.from("profiles").insert({
				user_id: data.user.id,
				first_name,
				last_name,
				role: UserRoles.user,
			});
		}
		return data.user;
	};

	const login = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw error;

		if (data.session) {
			setSession(data.session.access_token);
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
	};

	useEffect(() => {
		console.log("User:", user);
		console.log("Session:", session);
	}, [session, user]);

	const contextValue = useMemo(() => {
		return { user, session, register, login, logout };
	}, [user, session]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
