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
						: modal.justify === "custom"
							? "flex justify-[custom]"
							: "flex justify-center";

		const alignClass =
			modal.align === "center"
				? "items-center"
				: modal.align === "left"
					? "items-start"
					: modal.align === "right"
						? "items-end"
						: modal.align === "custom"
							? "items-[custom]"
							: "items-center";

		return (
			<div
				ref={ref}
				className={clsx("h-full w-full bg-modal-overlay", justifyClass, alignClass)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

export default ModalOverlay;
