import { useState, useEffect, PropsWithChildren, useMemo, useCallback } from "react";
import { supabase } from "@/shared/lib/services";
import { User, UserRoles } from "@/shared/types/general";
import { AuthContext } from "@/features/auth/hooks/useAuth";

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUser = async (session: any) => {
			setLoading(true);

			if (!session?.user) {
				setUser(null);
				setSession(null);
				return;
			}

			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", session.user.id)
				.single();

			if (error) {
				console.error("Error fetching user: ", error);
				return;
			}

			setUser(data);
			setSession(session.access_token);
			setLoading(false);
		};

		supabase.auth.getSession().then(({ data }) => {
			fetchUser(data.session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			fetchUser(session);
		});

		return () => {
			authListener?.subscription?.unsubscribe();
		};
	}, []);

	const register = useCallback(
		async (email: string, password: string, first_name: string, last_name: string) => {
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
		},
		[]
	);

	const login = useCallback(async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw error;

		if (data.session) {
			setSession(data.session.access_token);
		}
	}, []);

	const logout = useCallback(async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
	}, []);

	// useEffect(() => {
	// 	console.log("useAuth state:", { user, loading });
	// }, [session, user]);

	const contextValue = useMemo(
		() => ({
			user,
			session,
			loading,
			register,
			login,
			logout,
		}),
		[user, session]
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
