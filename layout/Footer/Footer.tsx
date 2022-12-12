import { FooterProps } from './Footer.props';
import { format } from 'date-fns';
import cn from 'classnames';
import styles from './Footer.module.scss';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(styles.footer, className)} {...props}>
			<div>
				OwlTop © 2020 - {format(new Date(), 'yyyy')} <span>Все права защищены</span>
			</div>
			<a className={styles.link} href='#' target='_blank'>
				Пользовательское соглашение
			</a>
			<a className={styles.link} href='#' target='_blank'>
				Политика конфиденциальности
			</a>
		</footer>
	);
};
