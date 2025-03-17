import React from "react";
import { Modal } from "@/shared/types/modal";
import useModal from "@/shared/hooks/useModal";
import ModalOverlay from "../overlay/modalOverlay";
import RenderModal from "./renderModal";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type ModalContainerProps = { modal: Modal };

const ModalContainer = ({ modal }: ModalContainerProps): React.JSX.Element => {
	const { remove } = useModal();

	const sizeClass =
		modal.size === "custom"
			? modal.className
			: {
					small: "w-sm h-auto",
					medium: "w-md h-auto",
					large: "w-lg h-auto",
				}[modal.size || "medium"];

	const alignDirection = modal.align ?? "bottom";

	const slideDirection = {
		top: { y: "-100%" },
		bottom: { y: "100%" },
		left: { x: "-100%" },
		right: { x: "100%" },
	};

	const slide = slideDirection[alignDirection];

	return (
		<AnimatePresence>
			<div
				id="modal"
				className="overflow-hidden fixed w-full h-full flex top-0 left-0 z-115"
				role="dialog"
				aria-modal="true"
			>
				<ModalOverlay modal={modal} onClick={() => remove()}>
					<motion.div
						initial={slide}
						animate={{ x: 0, y: 0 }}
						exit={slide}
						transition={{
							duration: 0.35,
							ease: "easeOut",
						}}
						onClick={(e) => e.stopPropagation()}
						className={clsx(
							"bg-primary border-solid border-modifier-border-color",
							modal.size === "custom" ? modal.className : sizeClass
						)}
					>
						<RenderModal modal={modal} />
					</motion.div>
				</ModalOverlay>
			</div>
		</AnimatePresence>
	);
};

export default ModalContainer;
