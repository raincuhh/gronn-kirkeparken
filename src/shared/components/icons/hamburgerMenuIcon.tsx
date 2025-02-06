import React from "react";

type HamburgerMenuIconProps = {
	className?: string;
};

const HamburgerMenuIcon = ({ className }: HamburgerMenuIconProps): React.JSX.Element => {
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
				<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
			</svg>
		</>
	);
};

export default HamburgerMenuIcon;
