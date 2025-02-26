import DottedHorizontalRoundedIcon from "@/shared/components/icons/dottedHorizontalRoundedIcon";
import React from "react";

const AnnouncementsHeader = (): React.JSX.Element => {
	const admin = true;

	return (
		<header
			id="announcements-header"
			className=" flex w-full mt-16 items-center border-solid border-modifier-border-color border-b"
		>
			<div className=" w-full md:px-16 px-4 max-w-[1140px] mx-auto min-h-48 flex justify-between items-center">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl md:text-3xl font-xl">Kunngjøringer</h1>
					<p className="text-text-muted text-md md:text-lg font-lg">
						Se de nyeste kunngjøringene om Grønn Kirkeparken
					</p>
				</div>
				<div>
					{admin ? (
						<div className="p-1 flex justify-center items-center rounded-md border-solid border-[1px] border-modifier-border-color hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default">
							<DottedHorizontalRoundedIcon />
						</div>
					) : null}
				</div>
			</div>
		</header>
	);
};

export default AnnouncementsHeader;
