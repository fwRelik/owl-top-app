import styles from './Up.module.scss';
import cn from 'classnames';

import ChevroIcon from './icons/chevron.svg';
import { useScrollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		const value = y > 500 ? 1 : 0;
		controls.start({ opacity: value });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.button onClick={scrollToTop} className={styles.up} animate={controls} initial={{ opacity: 0 }}>
			<ChevroIcon />
		</motion.button>
	);
};
