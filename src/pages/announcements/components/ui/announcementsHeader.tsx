// import DottedHorizontalRoundedIcon from "@/shared/components/icons/dottedHorizontalRoundedIcon";
import React from "react";

const AnnouncementsHeader = (): React.JSX.Element => {
	// const admin = true;

	return (
		<header
			id="announcements-header"
			className=" flex w-full mt-16 border-solid border-modifier-border-color border-b"
		>
			<div className="flex flex-col w-full md:px-16 px-4 md:py-12 py-8 max-w-[1140px] mx-auto md:min-h-48">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<h1 className="text-2xl sm:text-3xl font-xl !mb-4">Kunngjøringer</h1>
						<p className="text-text-muted text-md md:text-lg font-lg">
							Se de nyeste kunngjøringene om Grønn Kirkeparken
						</p>
					</div>
					<div>
						{/* {admin ? (
							<div className="p-1 flex justify-center items-center rounded-md border-solid border-[1px] border-modifier-border-color hover:bg-primary-alt transition-colors duration-100 ease-in-out cursor-default">
								<DottedHorizontalRoundedIcon />
							</div>
						) : null} */}
					</div>
				</div>
			</div>
		</header>
	);
};

export default AnnouncementsHeader;
