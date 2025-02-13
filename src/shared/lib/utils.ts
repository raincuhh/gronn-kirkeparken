export const uppercaseify = (str: string): string => {
	let first: string = str.charAt(0);
	if (first !== first.toUpperCase()) {
		str = str.charAt(0).toUpperCase() + str.slice(1);
	}
	return str;
};

export const uppercaseifySentences = (str: string): string => {
	let words: string[] = str.split(" ");
	words.forEach((word: string, i: number) => {
		words[i] = uppercaseify(word);
	});
	return words.join(" ");
};

export const lowercaseify = (str: string): string => {
	let first: string = str.charAt(0);
	if (first !== first.toLowerCase()) {
		str = str.charAt(0).toLowerCase() + str.slice(1);
	}
	return str;
};

export const lowercaseifySentences = (str: string): string => {
	let words: string[] = str.split(" ");
	words.forEach((word: string, i: number) => {
		words[i] = lowercaseify(word);
	});
	return words.join(" ");
};

export const sqlTimestampToDate = (timestamp: string): Date | null => {
	if (!timestamp || typeof timestamp !== "string") return null;

	const match = timestamp.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
	if (!match) return null;

	const [_, year, month, day, hour, minute, second] = match.map(Number);

	return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
};

export const sqlTimestampToDateVTwo = (timestamp: string): Date | null => {
	if (!timestamp || typeof timestamp !== "string") return null;

	const date = new Date(timestamp + "Z");

	return isNaN(date.getTime()) ? null : date;
};

export const sanitizeAndHyphenate = (str: string): string => {
	return str
		.normalize("NFKD")
		.replace(/[^\x00-\x7F]/g, "")
		.trim()
		.replace(/\s+/g, "-");
};

export const timeAgo = (date: Date): string => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) return "Invalid date";

	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return `${diffInSeconds} second(s) ago`;
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) return `${diffInMinutes} minute(s) ago`;
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays} day(s) ago`;
	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4) return `${diffInWeeks} week(s) ago`;
	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) return `${diffInMonths} month(s) ago`;
	const diffInYears = Math.floor(diffInDays / 365);
	return `${diffInYears} year(s) ago`;
};
