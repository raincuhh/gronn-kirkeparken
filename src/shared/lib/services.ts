import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { VERCEL_SUPABASE_PROJECT_URL, VERCEL_SUPABASE_PUBLIC_KEY } from "./env";

const supabaseInstance = (): SupabaseClient<any, "public", any> => {
	if (!VERCEL_SUPABASE_PROJECT_URL || !VERCEL_SUPABASE_PUBLIC_KEY) {
		throw new Error("Supabase URL or Public Key is missing");
	}

	return createClient(VERCEL_SUPABASE_PROJECT_URL, VERCEL_SUPABASE_PUBLIC_KEY);
};

export { supabaseInstance };
