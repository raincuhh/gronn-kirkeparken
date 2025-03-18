import React, { PropsWithChildren, useMemo, useState } from "react";
import { Modal } from "@/shared/types/modal";
import { ModalContext } from "@/shared/hooks/useModal";

type ModalProviderProps = PropsWithChildren;

const ModalProvider = ({ children }: ModalProviderProps): React.JSX.Element => {
	const [modals, setModals] = useState<Modal[]>([]);

	const open = (modal: Modal) => setModals((old) => [...old, modal]);

	const remove = () => {
		setModals((old) => {
			const lastModal = old[old.length - 1];
			lastModal?.onClose?.();
			return old.slice(0, old.length - 1);
		});
	};

	const removeById = (id: string) => {
		setModals((old) => {
			const modalToRemove = old.find((modal) => modal.id === id);
			modalToRemove?.onClose?.();
			return old.filter((modal) => modal.id !== id);
		});
	};

	const removeAll = () => {
		setModals((old) => {
			old.forEach((modal) => modal.onClose?.());
			return [];
		});
	};

	const contextValue = useMemo(
		() => ({
			modals,
			open,
			remove,
			removeAll,
			removeById,
		}),
		[modals, open, remove, removeAll, removeById]
	);

	return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
