export enum RouteTypes {
	public,
	protected,
	auth,
	private,
}

export type RouteListProps = {
	id?: string;
	url: string;
	element: React.JSX.Element;
	errorElement?: React.JSX.Element;
	type?: RouteTypes;
};
