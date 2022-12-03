import { ReviewProps } from './Review.props';
import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating';

import styles from './Review.module.scss';
import UserIcon from './icons/user.svg';

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
	const { name, createdAt, description, rating, title } = review;
	return (
		<div className={cn(styles.review, className)} {...props}>
			<UserIcon className={styles.userIcon} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:</span>
				<span>{title}</span>
			</div>
			<div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
			<div className={styles.rating}>
				<Rating rating={rating} />
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
};
