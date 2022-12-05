import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import { Search } from '../../components';
import cn from 'classnames';
import styles from './Sidebar.module.scss';
import Logo from '../icons/logo.svg';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(styles.sidebar, className)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<Menu />
		</div>
	);
};
