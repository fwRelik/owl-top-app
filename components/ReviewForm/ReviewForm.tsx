import { ReviewFormProps } from './ReviewForm.props';
import { Textarea } from '../Textarea/Textarea';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import cn from 'classnames';
import styles from './ReviewForm.module.scss';
import XmarkIcon from './icons/xmark.svg';

export const ReviewForm = ({ productId, className }: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	const errorConfig = {
		name: { required: { value: true, message: 'Введите имя' } },
		title: { required: { value: true, message: 'Введите заголовок' } },
		description: { required: { value: true, message: 'Введите описание' } },
		rating: { required: { value: true, message: 'Укажите рейтинг' } },
	};

	const validateRating = (value: number) => {
		return !!value;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}>
				<Input
					{...register('name', errorConfig.name)}
					error={errors.name}
					placeholder={'Имя'}
					className={cn(styles.input, styles.name)}
				/>
				<Input
					{...register('title', errorConfig.title)}
					error={errors.title}
					placeholder={'Заголовок отзыва'}
					className={cn(styles.input, styles.title)}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={errorConfig.rating}
						render={({ field: { value, ref, onChange } }) => (
							<Rating isEditable rating={value} ref={ref} error={errors.rating} setRating={onChange} />
						)}
					/>
				</div>
				<Textarea
					{...register('description', errorConfig.description)}
					error={errors.description}
					placeholder={'Текст отзыва'}
					className={styles.description}
				/>
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
