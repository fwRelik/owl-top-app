import { AppContext } from '../../context/app.context';
import { KeyboardEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import cn from 'classnames';
import styles from './Menu.module.scss';
import { motion, useReducedMotion } from 'framer-motion';
import { useKeyDownEvent } from '../../hooks/useKeyDownEvent';

export const Menu = (): JSX.Element => {
	const [announce, setAnnounce] = useState<boolean | undefined>(undefined);
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const { skipDefEvent } = useKeyDownEvent();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: shouldReduceMotion
				? {}
				: {
						when: 'beforeChildren',
						staggerChildren: 0.1,
				  },
		},
		hidden: {
			marginBottom: 0,
		},
	};

	const variantsChildren = {
		visible: { opacity: 1, height: 29 },
		hidden: { opacity: 0, height: 0 },
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map(m => {
					if (m._id.secondCategory == secondCategory) {
						m.isOpened = !m.isOpened;
						setAnnounce(m.isOpened);
					}
					return m;
				})
			);
	};

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory,
								})}>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) m.isOpened = true;
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) =>
									skipDefEvent(key, { cb: () => openSecondLevel(m._id.secondCategory) })
								}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}>
								<span className={styles.notSelect}>{m._id.secondCategory}</span>
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean = false) => {
		return pages.map(p => (
			<motion.li layout variants={variantsChildren} key={p._id}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					onKeyDown={skipDefEvent}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
					})}
					aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}>
					{p.category}
				</Link>
			</motion.li>
		));
	};

	return (
		<nav className={styles.menu} role={'navigation'}>
			{
				<span role={'log'} className={styles.visualyHidden}>
					{announce ? 'развернуто' : 'свренуто'}
				</span>
			}
			{buildFirstLevel()}
		</nav>
	);
};
