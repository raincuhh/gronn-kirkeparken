import React, { forwardRef, PropsWithChildren } from "react";
import { Modal } from "@/shared/types/modal";
import clsx from "clsx";

type ModalOverlayProps = PropsWithChildren & React.HTMLAttributes<HTMLElement> & { modal: Modal };

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
	({ children, modal, ...props }: ModalOverlayProps, ref) => {
		const justifyClass =
			modal.justify === "center"
				? "flex justify-center"
				: modal.justify === "left"
					? "flex justify-start"
					: modal.justify === "right"
						? "flex justify-end"
						: "flex justify-center";

		const alignClass =
			modal.align === "top"
				? "items-center"
				: modal.align === "left"
					? "items-start"
					: modal.align === "right"
						? "items-end"
						: modal.align === "bottom"
							? "items-end"
							: "items-center";

		return (
			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				className={clsx("h-full w-full bg-modal-overlay", justifyClass, alignClass)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

export default ModalOverlay;
