import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.scss';
import Logo from '../../public/icons/logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
		},
	};

	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo />
			<ButtonIcon
				className={styles.menuButton}
				appearance='white'
				icon='menu'
				onClick={() => setIsOpened(true)}></ButtonIcon>
			<motion.div
				variants={variants}
				initial='closed'
				animate={isOpened ? 'opened' : 'closed'}
				className={styles.mobileMenu}>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setIsOpened(false)}></ButtonIcon>
			</motion.div>
		</header>
	);
};
