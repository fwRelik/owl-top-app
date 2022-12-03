import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.scss';
import { Textarea } from '../Textarea/Textarea';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';
import { Controller, useForm } from 'react-hook-form';

import XmarkIcon from './icons/xmark.svg';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({ productId, className }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}>
				<Input {...register('name')} placeholder={'Имя'} className={cn(styles.input, styles.name)} />
				<Input
					{...register('title')}
					placeholder={'Заголовок отзыва'}
					className={cn(styles.input, styles.title)}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }) => <Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />}
					/>
				</div>
				<Textarea {...register('description')} placeholder={'Текст отзыва'} className={styles.description} />
				<div className={styles.submit}>
					<Button className={styles.button} appearance='primary'>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
				<XmarkIcon className={styles.close} />
			</div>
		</form>
	);
};
