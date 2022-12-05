import { DividerProps } from './Divider.props';
import styles from './Divider.module.scss';
import cn from 'classnames';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
	return <hr className={cn(styles.hr, className)} {...props} />;
};
