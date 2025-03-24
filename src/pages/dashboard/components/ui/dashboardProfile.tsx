import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CurrentPageHeader } from "../../types/type";
import DashboardCurrentPageHeader from "./dashboardCurrentPageHeader";
import { supabase } from "@/shared/lib/services";
import { User } from "@/shared/types/general";
import Button from "@/shared/components/ui/button";
import DashboardProfileItem from "./dashboardProfileItem";
import Skeleton from "react-loading-skeleton";
import useAuth from "@/features/auth/hooks/useAuth";

type DashboardProfileProps = {
	currentPageHeader: CurrentPageHeader;
};

const DashboardProfile = ({ currentPageHeader }: DashboardProfileProps): React.JSX.Element => {
	const [profileData, setProfileData] = useState<User | null>(null);
	const [profileError, setProfileError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { logout } = useAuth();

	const fetchProfile = useCallback(async () => {
		setLoading(true);
		setProfileError(null);

		const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

		if (sessionError || !sessionData.session?.user) {
			console.error("Error fetching auth session:", sessionError);
			setProfileError("Kunne ikke laste inn brukerøkten");
			setProfileData(null);
			setLoading(false);
			return;
		}

		const userEmail = sessionData.session.user.email;

		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("user_id", (await supabase.auth.getSession()).data.session?.user.id)
			.maybeSingle();

		if (error) {
			console.error("Error fetching Profile: ", error);
			setProfileError("Kunne ikke laste inn profil");
			setProfileData(null);
			setLoading(false);
			return;
		}

		if (!data || data.length === 0) {
			setProfileData(null);
			setLoading(false);
			return;
		}

		setProfileData({ ...data, email: userEmail });
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	const memoizedProfile = useMemo(() => profileData, [profileData]);

	return (
		<div className="flex flex-col">
			<DashboardCurrentPageHeader title={currentPageHeader.title} desc={currentPageHeader.desc} />
			{loading ? (
				<div className="flex w-full flex-col gap-4 mt-4">
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"3rem"} />
				</div>
			) : profileError ? (
				<div className="w-full min-h-[20rem] border-solid border-modifier-border-color border-b border-x flex items-center justify-center flex-col gap-4">
					<p className="text-lg">En feil oppstod</p>
					<p className="font-xl text-2xl text-modifier-error">{profileError}</p>
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
			) : memoizedProfile != null ? (
				<div className="flex flex-col w-full mt-4">
					<ul className="w-full gap-2">
						<DashboardProfileItem title={"id"} dataText={memoizedProfile.user_id ?? ""} />
						<DashboardProfileItem title={"fornavn"} dataText={memoizedProfile.first_name ?? ""} />
						<DashboardProfileItem title={"etternavn"} dataText={memoizedProfile.last_name ?? ""} />
						<DashboardProfileItem title={"e-post"} dataText={memoizedProfile.email ?? ""} />
						<DashboardProfileItem title={"rolle"} dataText={memoizedProfile.role ?? ""} />
						<DashboardProfileItem title={"opprettet"} dataText={memoizedProfile.created_at ?? ""} />
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
