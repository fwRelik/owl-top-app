import { TagProps } from './Tag.props';
import styles from './Tag.module.scss';
import cn from 'classnames';

export const Tag = ({ size = 'm', children, color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {
	const content = href ? <a href={href}>{children}</a> : children;
	return (
		<div
			className={cn(styles.tag, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.ghost]: color == 'ghost',
				[styles.red]: color == 'red',
				[styles.gray]: color == 'gray',
				[styles.green]: color == 'green',
				[styles.primary]: color == 'primary',
			})}
			{...props}>
			{content}
		</div>
	);
};
