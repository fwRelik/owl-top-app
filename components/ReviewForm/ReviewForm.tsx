import axios from 'axios';
import { ReviewFormProps } from './ReviewForm.props';
import { Textarea } from '../Textarea/Textarea';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { useState } from 'react';
import { API, formConfig, responseConfig } from '../../configs';
import cn from 'classnames';
import styles from './ReviewForm.module.scss';
import XmarkIcon from '../../public/icons/xmark.svg';
import { useKeyDownEvent } from '../../hooks/useKeyDownEvent';

export const ReviewForm = ({
	productId,
	isReviewOpened = false,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const { success, failed } = responseConfig; // getting responses from config file
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const { skipDefEvent } = useKeyDownEvent();

	const accessibility = (): number => (isReviewOpened ? 0 : -1);

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.create, { ...formData, productId });
			if (data._id) {
				setIsSuccess(true);
				setError(undefined);
				reset();
			} else {
				setIsSuccess(false);
				setError(failed.description);
			}
		} catch (e: any) {
			setIsSuccess(false);
			setError(failed.description);
		}
	};

	const requestMessage = isSuccess ? (
		<div className={cn(styles.statusMessage, styles.success)} role={'alert'}>
			<div className={styles.title}>{success.title}</div>
			<div> {success.description}</div>
			<button className={styles.close} aria-label={'Закрыть оповещение'} onClick={() => setIsSuccess(false)}>
				<XmarkIcon />
			</button>
		</div>
	) : error ? (
		<div className={cn(styles.statusMessage, styles.error)} role={'alert'}>
			<div className={styles.title}>{failed.title}</div>
			<div> {failed.description}</div>
			<button className={styles.close} aria-label={'Закрыть оповещение'} onClick={() => setError(undefined)}>
				<XmarkIcon />
			</button>
		</div>
	) : null;

	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<div className={cn(styles.reviewForm, className)}>
				<Input
					{...register('name', formConfig.name)}
					error={errors.name}
					placeholder={'Имя'}
					tabIndex={accessibility()}
					className={cn(styles.input, styles.name)}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', formConfig.title)}
					error={errors.title}
					placeholder={'Заголовок отзыва'}
					tabIndex={accessibility()}
					className={cn(styles.input, styles.title)}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={formConfig.rating}
						render={({ field: { value, ref, onChange } }) => (
							<Rating
								isEditable={isReviewOpened}
								rating={value}
								ref={ref}
								error={errors.rating}
								setRating={onChange}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', formConfig.description)}
					error={errors.description}
					placeholder={'Текст отзыва'}
					tabIndex={accessibility()}
					className={styles.description}
					aria-label={'Текст отзыва'}
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						tabIndex={accessibility()}
						className={styles.button}
						appearance='primary'
						onClick={() => clearErrors()}>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{requestMessage}
		</form>
	);
};
