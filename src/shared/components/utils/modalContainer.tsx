import React from "react";
import { Modal } from "@/shared/types/modal";
import useModal from "@/shared/hooks/useModal";
import ModalOverlay from "../overlay/modalOverlay";
import RenderModal from "./renderModal";
import clsx from "clsx";

type ModalContainerProps = { modal: Modal };

export default function ModalContainer({ modal }: ModalContainerProps): React.JSX.Element {
	const { remove } = useModal();

	const sizeClass =
		modal.size === "small"
			? "w-sm h-[auto]"
			: modal.size === "medium"
				? "w-md h-[auto]"
				: modal.size === "large"
					? "w-lg h-[auto]"
					: modal.size === "custom"
						? "w-[calc(100%-2rem)] h-[auto]"
						: "w-[500px] h-[auto]";

	return (
		<>
			<div
				id="modal"
				className="overflow-hidden fixed w-full h-full flex top-0 left-0 z-115"
				role="dialog"
				aria-modal="true"
			>
				<ModalOverlay modal={modal} onClick={() => remove()}>
					<RenderModal className={clsx("bg-primary px-4 py-4", sizeClass)} modal={modal} />
				</ModalOverlay>
			</div>
		</>
	);
}
