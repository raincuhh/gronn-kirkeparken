import useModal from "@/shared/hooks/useModal";
import React from "react";
import RenderList from "./renderList";
import { Modal } from "@/shared/types/modal";
import ModalContainer from "./modalContainer";

const ModalRoot = (): React.JSX.Element => {
	const { modals } = useModal();

	return (
		<div>
			<RenderList
				data={modals}
				render={(modal: Modal, i: number) => <ModalContainer key={i} modal={modal} />}
			/>
		</div>
	);
};

export default ModalRoot;
