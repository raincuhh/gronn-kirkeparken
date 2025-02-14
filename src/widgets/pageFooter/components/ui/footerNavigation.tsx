import RenderList from "@/shared/components/utils/renderList";
import React from "react";
import { Link } from "react-router-dom";

type FooterSection = {
	title: string;
	links: { title: string; href: string }[];
};

type FooterNavigationProps = {
	sections: FooterSection[];
	isAdmin: boolean;
	adminLinks: FooterSection;
};

const FooterNavigation = ({ sections, isAdmin, adminLinks }: FooterNavigationProps): React.JSX.Element => {
	return (
		<>
			<RenderList
				data={sections}
				render={(item: FooterSection, i: number) => (
					<div key={i}>
						<h2 className="text-md text-text-normal !mt-4 !mb-2 font-xl">{item.title}</h2>
						<ul className="list-none">
							<RenderList
								data={item.links}
								render={(row: { title: string; href: string }, i) => (
									<li
										key={i}
										className="text-text-muted !py-1 hover:text-text-normal font-lg transition-colors duration-100 ease-in-out list-none"
									>
										<Link to={row.href}>{row.title}</Link>
									</li>
								)}
							/>
						</ul>
					</div>
				)}
			/>
			{isAdmin && (
				<RenderList
					data={[adminLinks]}
					render={(item: FooterSection, i: number) => (
						<div key={i}>
							<h2 className="text-md text-text-normal !mt-4 !mb-2 font-xl">{item.title}</h2>
							<ul className="list-none">
								<RenderList
									data={item.links}
									render={(row: { title: string; href: string }, i) => (
										<li
											key={i}
											className="text-text-muted !py-1 hover:text-text-normal font-lg transition-colors duration-100 ease-in-out list-none"
										>
											<Link to={row.href}>{row.title}</Link>
										</li>
									)}
								/>
							</ul>
						</div>
					)}
				/>
			)}
		</>
	);
};

export default FooterNavigation;
