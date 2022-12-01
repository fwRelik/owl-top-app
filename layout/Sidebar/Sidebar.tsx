import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import Logo from '../icons/logo.svg';
import styles from './Sidebar.module.scss';
import cn from 'classnames';
import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(styles.sidebar, className)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<Menu />
		</div>
	);
};
