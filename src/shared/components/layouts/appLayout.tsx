import React, { PropsWithChildren } from "react";

type AppLayoutProps = PropsWithChildren;

const AppLayout = ({ children }: AppLayoutProps): React.JSX.Element => {
	return (
		<div className="min-h-dvh h-dvh basis-0 flex-1 leading-relaxed bg-primary">
			<div className="flex h-full">{children}</div>
		</div>
	);
};

export default AppLayout;
