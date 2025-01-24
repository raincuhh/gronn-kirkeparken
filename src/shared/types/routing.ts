export enum RouteTypes {
	public,
	auth,
	protected,
	admin,
}

export type RouteListProps = {
	id: string;
	url: string;
	element: React.JSX.Element;
	errorElement?: React.JSX.Element;
	type?: RouteTypes;
};
