import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.scss';
import cn from 'classnames';
import StarIcon from '../../public/icons/star.svg';
import { useKeyDownEvent } from '../../hooks/useKeyDownEvent';

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, className, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(null));
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);
		const { skipDefEvent } = useKeyDownEvent();

		useEffect(() => {
			constructRating(rating);
		}, [rating, isEditable]);

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						key={i}
						ref={r => ratingArrayRef.current?.push(r)}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
							handleKey(i, e);
							skipDefEvent(e, null, 'all');
						}}
						role={isEditable ? 'slider' : ''}
						aria-valuenow={rating}
						aria-valuemax={5}
						aria-valuemin={1}
						aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
						aria-invalid={error ? true : false}>
						<StarIcon
							className={cn(styles.star, {
								[styles.filled]: i < currentRating,
								[styles.editable]: isEditable,
							})}
						/>
					</span>
				);
			});

			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number) => {
			if (isEditable) constructRating(i);
		};

		const onClick = (i: number) => {
			if (isEditable && typeof setRating === 'function') setRating(i);
		};

		const handleKey = (i: number, e: KeyboardEvent<HTMLSpanElement>) => {
			if (typeof setRating != 'function') return;
			if (e.code == 'Space') setRating(++i);

			if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
				setRating(i < 5 ? i + 2 : 5);
				ratingArrayRef.current[++i]?.focus();
			}
			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				setRating(i > 1 ? i : 1);
				ratingArrayRef.current[--i]?.focus();
			}
		};

		return (
			<div
				className={cn(styles.rating, {
					[styles.error]: error,
				})}
				ref={ref}
				{...props}>
				{ratingArray}
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		);
	}
);
