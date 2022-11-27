import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import styles from './Sidebar.module.scss';
import cn from 'classnames'

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo}/>
			<div>Поиск</div>
			<Menu />
		</div>
	);
};
