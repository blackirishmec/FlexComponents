import React, { memo, useMemo } from 'react';

import type { FlexPositionValue } from '@/types/FlexPositionValue';
import type { HTMLAttributes, ReactNode } from 'react';

import alignItemsMap from '@/utilities/alignItemsMap';
import justifyContentMap from '@/utilities/justifyContentMap';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
	/** The content to be rendered inside the row. */
	children?: ReactNode;
	/** Horizontal alignment of the children inside the row. */
	childrenHorizontalPosition?: FlexPositionValue;
	/** Vertical alignment of the children inside the row. */
	childrenVerticalPosition?: FlexPositionValue;
	/** Additional className(s) to pass to the component. */
	className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

/**
 * A flexible row container component that arranges its children horizontally.
 *
 * @component
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the row
 * @param {string} [props.childrenHorizontalPosition] - Horizontal alignment of children ('left'|'center'|'right'|'between'|'around'|'evenly')
 * @param {string} [props.childrenVerticalPosition] - Vertical alignment of children ('top'|'center'|'bottom'|'stretch'|'baseline')
 * @param {string} [props.className] - Additional CSS class names to apply to the row
 *
 * @returns {JSX.Element} A div element with flex-row layout and specified alignment properties
 *
 * @example
 * <Row childrenHorizontalPosition="center" childrenVerticalPosition="center">
 *   <div>Centered content</div>
 * </Row>
 */
export const Row = memo(function Row({
	children,
	childrenHorizontalPosition,
	childrenVerticalPosition,
	className: propClassName = '',
	...props
}: RowProps) {
	const alignItemsClassName = useMemo(
		() =>
			childrenVerticalPosition && alignItemsMap[childrenVerticalPosition],
		[childrenVerticalPosition],
	);

	const justifyContentClassName = useMemo(
		() =>
			childrenHorizontalPosition &&
			justifyContentMap[childrenHorizontalPosition],
		[childrenHorizontalPosition],
	);

	const className = useMemo(
		() =>
			`flex flex-row ${justifyContentClassName !== undefined ? ` ${justifyContentClassName}` : ''}${alignItemsClassName !== undefined ? ` ${alignItemsClassName}` : ''}${propClassName && ` ${propClassName}`}`,
		[alignItemsClassName, justifyContentClassName, propClassName],
	);

	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
});
