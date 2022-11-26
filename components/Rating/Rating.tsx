import { KeyboardEvent, useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.scss';
import cn from 'classnames';
import StarIcon from './icons/star.svg';

export const Rating = ({ isEditable = false, rating, setRating, className, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(null));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<StarIcon
					key={i}
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable,
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
					tabIndex={isEditable ? 0 : -1}
					onKeyDown={(e: KeyboardEvent<SVGAElement>) => handleSpace(i + 1, e)}
				/>
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

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if (e.code === 'Space' && typeof setRating === 'function') setRating(i);
	};

	return <div {...props}>{ratingArray}</div>;
};
