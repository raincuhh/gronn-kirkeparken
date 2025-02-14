type RightArrowProps = {
	className?: string;
};

const RightArrowAlt = ({ className }: RightArrowProps) => {
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
				<path d="M3 13h14.586l-5.293 5.293 1.414 1.414L21.414 12l-7.707-7.707-1.414 1.414L17.586 11H3z" />
			</svg>
		</>
	);
};

export default RightArrowAlt;
