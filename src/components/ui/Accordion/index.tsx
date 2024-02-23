'use client';

import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import styles from './Accordion.module.scss';

import { cn } from '@/lib/utils';

type AccordionProps<
	T extends { header?: React.ReactNode; content?: React.ReactNode; value?: string },
> = (AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & {
	data?: T[] | T;
	itemClassName?: string;
	headerClassName?: string;
	contentClassName?: string;
	ref?: ForwardedRef<HTMLDivElement>;
};

const MainAccordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item ref={ref} className={cn(styles.accordion, className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className={styles.header}>
		<AccordionPrimitive.Trigger ref={ref} className={cn(styles.trigger, className)} {...props}>
			{children}
			<ChevronDownIcon className={styles.icon} />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content ref={ref} className={cn(styles.content, className)} {...props}>
		<div className={styles.padding}>{children}</div>
	</AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const AccordionBase = <
	T extends { header?: React.ReactNode; content?: React.ReactNode; value?: string },
>({
	data,
	itemClassName,
	headerClassName,
	contentClassName,
	...props
}: AccordionProps<T>) => (
	<MainAccordion {...props}>
		{Array.isArray(data) ? (
			data.map((item, index) => (
				<AccordionItem
					value={item.value || index.toString()}
					className={itemClassName}
					key={index.toString()}
				>
					<AccordionTrigger className={headerClassName}>{item.header}</AccordionTrigger>
					<AccordionContent className={contentClassName}>{item.content}</AccordionContent>
				</AccordionItem>
			))
		) : (
			<AccordionItem value={data?.value || 'item-1'} className={itemClassName}>
				<AccordionTrigger className={headerClassName}>{data?.header}</AccordionTrigger>
				<AccordionContent className={contentClassName}>{data?.content}</AccordionContent>
			</AccordionItem>
		)}
	</MainAccordion>
);

// Forwarding the ref
const Accordion = forwardRef<
	React.ElementRef<typeof AccordionBase>,
	React.ComponentPropsWithoutRef<typeof AccordionBase>
>((props, ref) => <AccordionBase {...props} ref={ref} />);

Accordion.displayName = AccordionPrimitive.Root.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, MainAccordion };
