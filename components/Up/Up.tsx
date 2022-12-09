import styles from './Up.module.scss';
import { useScrollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		const value = y > 500 ? 1 : 0;
		controls.start({ opacity: value });
	}, [y, controls]);

	const scrollToTop = () => {
		console.log('click!');
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.div className={styles.up} animate={controls} initial={{ opacity: 0 }}>
			<ButtonIcon appearance='primary' icon={'up'} onClick={scrollToTop} />
		</motion.div>
	);
};
