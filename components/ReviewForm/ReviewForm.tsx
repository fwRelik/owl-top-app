import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.scss';
import { Textarea } from '../Textarea/Textarea';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';

import XmarkIcon from './icons/xmark.svg';

export const ReviewForm = ({ productId, className}: ReviewFormProps): JSX.Element => {
	return (
		<>
			<div className={cn(styles.reviewForm, className)}>
				<Input placeholder={'Имя'} className={cn(styles.input, styles.name)} />
				<Input placeholder={'Заголовок отзыва'} className={cn(styles.input, styles.title)} />
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Rating rating={0} />
				</div>
				<Textarea placeholder={'Текст отзыва'} className={styles.description} />
				<div className={styles.submit}>
					<Button className={styles.button} appearance='primary'>Отправить</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
				<XmarkIcon className={styles.close}/>
			</div>
		</>
	);
};
