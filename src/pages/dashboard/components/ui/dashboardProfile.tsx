import React, { useCallback, useEffect, useState } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { supabase } from "@/shared/lib/services";
import { User } from "@/shared/types/general";
import Button from "@/shared/components/ui/button";
import DashboardProfileItem from "./dashboardProfileItem";
import Skeleton from "react-loading-skeleton";
import useAuth from "@/features/auth/hooks/useAuth";
import { sqlTimestampToDateVTwo, timeAgo } from "@/shared/lib/utils";

type DashboardProfileProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardProfile = ({ currentPageHeader }: DashboardProfileProps): React.JSX.Element => {
	const [profile, setProfile] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const { logout } = useAuth();

	const fetchProfile = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
			if (sessionError || !sessionData.session?.user) {
				throw new Error("Kunne ikke laste inn brukerøkten");
			}

			const user = sessionData.session.user;
			const { data, error: profileError } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", user.id)
				.maybeSingle();

			if (profileError) throw new Error("Kunne ikke laste inn profil");
			setProfile(data ? { ...data, email: user.email } : null);
		} catch (err: any) {
			console.error(err);
			setError(err.message);
			setProfile(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return (
		<div className="flex flex-col gap-4">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
			{loading ? (
				<div className="flex w-full flex-col gap-4">
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
				</div>
			) : error ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4 px-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{error}</p>
					<Button
						onClick={fetchProfile}
						variant={"outline"}
						size={"md"}
						rounded={"full"}
						className="font-xl"
					>
						Prøv igjen
					</Button>
				</div>
			) : profile != null ? (
				<div className="flex flex-col w-full mt-4">
					<ul className="w-full gap-2">
						<DashboardProfileItem title={"id"} dataText={profile.user_id ?? ""} />
						<DashboardProfileItem title={"fornavn"} dataText={profile.first_name ?? ""} />
						<DashboardProfileItem title={"etternavn"} dataText={profile.last_name ?? ""} />
						<DashboardProfileItem title={"e-post"} dataText={profile.email ?? ""} />
						<DashboardProfileItem title={"rolle"} dataText={profile.role ?? ""} />
						<DashboardProfileItem
							title={"opprettet"}
							dataText={
								profile?.created_at
									? (() => {
											const date = sqlTimestampToDateVTwo(profile.created_at);
											return date ? date.toLocaleDateString() + " - " + timeAgo(date) : "";
										})()
									: ""
							}
						/>
						<div
							onClick={() => logout()}
							className="font-lg text-lg text-text-accent mt-2 hover:text-text-accent-hover hover:underline cursor-pointer"
						>
							Logg ut
						</div>
					</ul>
				</div>
			) : (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-y border-x flex items-center justify-center">
					<p className="font-xl text-2xl">Ingen profildata funnet.</p>
				</div>
			)}
		</div>
	);
};

export default DashboardProfile;
