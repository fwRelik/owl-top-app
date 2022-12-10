import { AppContext } from '../../context/app.context';
import { KeyboardEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import cn from 'classnames';
import styles from './Menu.module.scss';
import { motion } from 'framer-motion';
import { useKeyDownEvent } from '../../hooks/useKeyDownEvent';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const { skipDefEvent } = useKeyDownEvent();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: {
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
					if (m._id.secondCategory == secondCategory) m.isOpened = !m.isOpened;
					return m;
				})
			);
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
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
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) m.isOpened = true;
					return (
						<div key={m._id.secondCategory}>
							<div
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent) =>
									skipDefEvent(key, { cb: () => openSecondLevel(m._id.secondCategory) })
								}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}>
								<span className={styles.notSelect}>{m._id.secondCategory}</span>
							</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean = false) => {
		return pages.map(p => (
			<motion.div layout variants={variantsChildren} key={p._id}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					onKeyDown={skipDefEvent}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
					})}>
					{p.category}
				</Link>
			</motion.div>
		));
	};

	return <nav className={styles.menu} role={'navigation'}>{buildFirstLevel()}</nav>;
};
