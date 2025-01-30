import { forwardRef, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
	"flex items-center justify-center font-weight-md transition-colors duration-100 ease-in-out cursor-default focus:outline-none disabled:pointer-events-none",
	{
		variants: {
			variant: {
				base: "bg-interactive-base hover:bg-interactive-base-hover",
				accent: "",
				destructive: "",
				ghost: "",
				outline: "",
				link: "",
			},
			size: {
				sm: "py-1 px-2 text-fs-sm",
				md: "py-2 px-4 text-fs-md",
				lg: "py-3 px-6 text-fs-lg",
			},
			rounded: {
				sm: "rounded-radius-sm",
				md: "rounded-radius-md",
				full: "rounded-radius-full",
			},
		},
		defaultVariants: {
			variant: "base",
			size: "md",
			rounded: "sm",
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
					<Link to={href} className={classes}>
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
