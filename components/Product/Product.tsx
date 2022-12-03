import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';

import styles from './Product.module.scss';
import ImageNotFound from '../../public/images/img_not_found.png';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = ({ product, children, className, ...props }: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	const advantages = product.advantages ? (
		<div className={styles.advantages}>
			<div className={styles.advTitle}>Преимущества</div>
			<div>{product.advantages}</div>
		</div>
	) : null;

	const disAdvantages = product.disAdvantages ? (
		<div className={styles.disAdvantages}>
			<div className={styles.advTitle}>Недостатки</div>
			<div>{product.disAdvantages}</div>
		</div>
	) : null;

	const image = product.image ? (
		<Image src={process.env.NEXT_PUBLIC_DOMAIN_FOLDER + product.image} alt={product.title} width={70} height={70} />
	) : (
		<Image src={ImageNotFound} alt={product.title} width={70} height={70} />
	);

	const reviewButton =
		product.reviews.length > 0 ? (
			<Button
				onClick={() => setIsReviewOpened(!isReviewOpened)}
				appearance={'ghost'}
				arrow={isReviewOpened ? 'down' : 'right'}>
				Читать отзывы
			</Button>
		) : null;

	const reviews = product.reviews
		? product.reviews.map(r => (
				<div key={r._id}>
					<Review review={r} />
					<Divider />
				</div>
		  ))
		: null;

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>{image}</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color={'green'}>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.month}>мес.</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.calculatedRating} />
				</div>
				<div className={styles.tags}>
					{
						<Tag className={styles.category} color={'ghost'}>
							{product.tags[0]}
						</Tag>
					}
					{/* {product.tags.map(c => (
					<Tag key={c} className={styles.category} color={'ghost'}>
						{c}
					</Tag>
				))} */}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}>
					{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{advantages}
					{disAdvantages}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button className={styles.reviewButton} appearance={'primary'}>
						Узнать подробнее
					</Button>
					{reviewButton}
				</div>
			</Card>
			<Card
				color='blue'
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}>
				{reviews}
				<ReviewForm productId={'qwe'} />
			</Card>
		</>
	);
};
