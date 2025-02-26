import { getRandomGradient } from "@/shared/lib/utils";
import React, { useMemo } from "react";

type ProfilePictureProps = {
	url?: string;
};

const ProfilePicture = ({ url }: ProfilePictureProps): React.JSX.Element => {
	const memoizedRandomGradient = useMemo(() => {
		return getRandomGradient();
	}, [getRandomGradient]);

	return (
		<div
			className="w-8 h-8 rounded-full flex items-center justify-center text-text-normal font-lg text-lg"
			style={{ background: url ? `url(${url})` : memoizedRandomGradient }}
		>
			{!url && "?"}
		</div>
	);
};

export default ProfilePicture;
