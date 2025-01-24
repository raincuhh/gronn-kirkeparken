export const getEnvVar = (key: string) => {
	if (import.meta.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`);
	}
	return import.meta.env[key] || "";
};

export const VERCEL_SUPABASE_PROJECT_URL: string = getEnvVar("VERCEL_SUPABASE_PROJECT_URL");
export const VERCEL_SUPABASE_PUBLIC_KEY: string = getEnvVar("VERCEL_SUPABASE_PUBLIC_KEY");
