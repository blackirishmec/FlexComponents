import React, { memo, useMemo } from 'react';

import type { FlexPositionValue } from '../../types/FlexPositionValue';
import type { HTMLAttributes, ReactNode } from 'react';

import alignItemsMap from '../../utilities/alignItemsMap';
import justifyContentMap from '../../utilities/justifyContentMap';

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
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
 * A flexible col container component that arranges its children horizontally.
 *
 * @component
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the col
 * @param {string} [props.childrenHorizontalPosition] - Horizontal alignment of children ('left'|'center'|'right'|'between'|'around'|'evenly')
 * @param {string} [props.childrenVerticalPosition] - Vertical alignment of children ('top'|'center'|'bottom'|'stretch'|'baseline')
 * @param {string} [props.className] - Additional CSS class names to apply to the col
 *
 * @returns {JSX.Element} A div element with flex-col layout and specified alignment properties
 *
 * @example
 * <Col childrenHorizontalPosition="center" childrenVerticalPosition="center">
 *   <div>Centered content</div>
 * </Col>
 */
export const Col = memo(function Col({
	children,
	childrenHorizontalPosition,
	childrenVerticalPosition,
	className: propClassName = '',
	...props
}: ColProps) {
	const alignItemsClassName = useMemo(
		() =>
			childrenHorizontalPosition &&
			alignItemsMap[childrenHorizontalPosition],
		[childrenHorizontalPosition],
	);

	const justifyContentClassName = useMemo(
		() =>
			childrenVerticalPosition &&
			justifyContentMap[childrenVerticalPosition],
		[childrenVerticalPosition],
	);

	const className = useMemo(
		() =>
			`flex flex-col ${justifyContentClassName !== undefined ? ` ${justifyContentClassName}` : ''}${alignItemsClassName !== undefined ? ` ${alignItemsClassName}` : ''}${propClassName && ` ${propClassName}`}`,
		[alignItemsClassName, justifyContentClassName, propClassName],
	);

	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
});
