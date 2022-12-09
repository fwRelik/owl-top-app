import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.scss';
import ArrowIcon from '../../public/icons/chevron.svg';

export const Button = ({
	appearance = 'primary',
	arrow = 'none',
	children,
	className,
	...props
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
			{...props}>
			{children}
			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow == 'down',
						[styles.right]: arrow == 'right',
					})}>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
