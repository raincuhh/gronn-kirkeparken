import { forwardRef, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
	"flex items-center justify-center font-weight-md transition-colors duration-100 ease-in-out cursor-default focus:outline-none disabled:pointer-events-none",
	{
		variants: {
			variant: {
				base: "bg-interactive-base hover:bg-interactive-base-hover !text-base-00",
				accent:
					"bg-interactive-accent hover:bg-interactive-accent-hover text-rgb-full border-interactive-accent-hover border-[1px]",
				destructive:
					"bg-destructive-500 hover:bg-destructive-600 border-solid border-destructive-600 hover:border-destructive-700 border-[1px] text-rgb-full",
				success:
					"bg-success-500 hover:bg-success-600 border-solid border-success-600 hover:border-success-700 border-[1px] text-rgb-full",
				ghost: "bg-transparent hover:bg-interactive-base hover:!text-base-00",
				outline:
					"bg-transparent !text-text-normal hover:bg-base-10 hover:border-base-20 border-solid border-[1px] border-modifier-border-color",
				link: "!underline !text-text-normal hover:!text-text-accent cursor-pointer",
			},
			size: {
				sm: "py-1 px-2 text-fs-sm",
				md: "py-2 px-4 text-fs-md",
				lg: "py-3 px-6 text-fs-lg",
			},
			rounded: {
				sm: "rounded-sm",
				md: "rounded-md",
				full: "rounded-full",
			},
		},
		defaultVariants: {
			variant: "base",
			size: "sm",
			rounded: "md",
		},
	}
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		href?: string;
		text?: string;
	};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, text, href, variant, size, rounded, ...props }: ButtonProps, ref) => {
		const classes = buttonVariants({ variant, size, rounded, className });

		if (href) {
			return (
				<>
					<Link
						to={href}
						className={clsx(classes, "text-text-normal")}
						{...(props as Omit<ButtonProps, keyof ButtonHTMLAttributes<HTMLButtonElement>>)}
					>
						{text || children}
					</Link>
				</>
			);
		}

		return (
			<>
				<button ref={ref} className={classes} {...props}>
					{text || children}
				</button>
			</>
		);
	}
);

export default Button;
