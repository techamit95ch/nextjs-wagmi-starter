import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import style from "./button.module.scss"
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	style.button1,
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				default: 'h-9 px-4 py-2',
				icon: 'h-9 w-9',
				lg: 'h-10 rounded-md px-8',
				sm: 'h-8 rounded-md px-3 text-xs',
			},
			variant: {
				default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'bg-transparent hover:bg-[rgba(2,2,2,0.01)]/20 text-primary underline-offset-4 hover:underline',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
			},
		},
	}
);

export interface BaseButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
	({ className, variant = 'default', size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				className={cn(buttonVariants({ className, size, variant }))}
				ref={ref}
				{...props}
			/>
		);
	}
);

BaseButton.displayName = 'BaseButton';

export type ButtonProps = BaseButtonProps & {
	isLoading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	icon?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, isLoading, startIcon, endIcon, icon, onClick, ...props }, ref) => {
		const handleClickInternal = (e: React.MouseEvent<HTMLButtonElement>) => {
			handleClick(e, onClick);
		};

		return (
			<BaseButton
				className={cn(
					buttonVariants({ className, size, variant }),
					isLoading && 'pointer-events-none opacity-70',
					'ripple relative overflow-hidden'
				)}
				ref={ref}
				onClick={handleClickInternal}
				{...props}
			>
				{isLoading && <Spinner />} {/* Display spinner when loading */}
				{startIcon && <span className="mr-2">{startIcon}</span>}
				{icon && <span className="mr-2">{icon}</span>}
				{props.children}
				{endIcon && <span className="ml-2">{endIcon}</span>}
			</BaseButton>
		);
	}
);

Button.displayName = 'Button';

// Example spinner component
const Spinner = () => (
	<svg
		className="mr-3 h-5 w-5 animate-spin"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
		></path>
	</svg>
);

const handleClick = (
	event: React.MouseEvent<HTMLButtonElement>,
	onClick?: ButtonProps['onClick']
) => {
	const rippleContainer = event.currentTarget;
	const rect = rippleContainer.getBoundingClientRect();

	const ripple = document.createElement('span');
	const size = Math.max(rect.width, rect.height);
	const x = event.clientX - rect.left - size / 2;
	const y = event.clientY - rect.top - size / 2;

	ripple.style.width = ripple.style.height = `${size}px`;
	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;

	ripple.classList.add('ripple-animation');

	rippleContainer.appendChild(ripple);

	setTimeout(() => {
		ripple.remove();
	}, 600); // Adjust the duration to match your CSS animation duration

	onClick && onClick(event);
};

export { BaseButton, Button, buttonVariants };
