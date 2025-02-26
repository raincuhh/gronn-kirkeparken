export type Modal = {
	id: string;
	content: React.ReactNode;
	closable?: boolean;
	size?: "small" | "medium" | "large" | "custom";
	justify?: "center" | "left" | "right";
	align?: "top" | "bottom" | "left" | "right";
	className?: string;
};
