import React, { forwardRef } from "react";
import { Modal } from "@/shared/types/modal";

type RenderModalProps = React.HTMLAttributes<HTMLElement> & { modal: Modal };

const RenderModal = forwardRef<HTMLDivElement, RenderModalProps>(
	({ modal, ...props }: RenderModalProps, ref): React.JSX.Element => {
		return (
			<>
				<div className="h-full" ref={ref} onClick={(e) => e.stopPropagation()} {...props}>
					{modal.content}
				</div>
			</>
		);
	}
);

export default RenderModal;
