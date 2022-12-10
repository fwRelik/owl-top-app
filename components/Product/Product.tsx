import { ForwardedRef, forwardRef, KeyboardEvent, MouseEventHandler, useRef, useState } from 'react';
import Image from 'next/image';
import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { API } from '../../configs/api.config';
import { motion } from 'framer-motion';
import styles from './Product.module.scss';
import ImageNotFound from '../../public/images/img_not_found.png';
import { useKeyDownEvent } from '../../hooks/useKeyDownEvent';

export const Product = motion(
	forwardRef(
		({ product, children, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const [imageShow, setImageShow] = useState<boolean>(true);
			const reviewRef = useRef<HTMLDivElement>(null);
			const { skipDefEvent } = useKeyDownEvent();

			const scrollToReview = () => {
				setIsReviewOpened(true);
				setTimeout(() => {
					// waiting for form block to open
					reviewRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
				}, 100);

				reviewRef.current?.focus();
			};

			const variantsCard = {
				close: { opacity: 0, height: 0 },
				open: { opacity: 1, height: 'auto' },
			};

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

			const image =
				product.image && imageShow ? (
					<Image
						src={API.domain.assets_folder + product.image}
						onError={() => setImageShow(false)}
						alt={product.title}
						width={70}
						height={70}
					/>
				) : (
					<Image src={ImageNotFound} alt={product.title} width={70} height={70} />
				);

			const reviews = product.reviews
				? product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
				  ))
				: null;

			return (
				<div className={className} ref={ref} {...props}>
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
							{product.tags.map(c => (
								<Tag key={c} className={styles.category} color={'ghost'}>
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle}>цена</div>
						<div className={styles.creditTitle}>кредит</div>
						<div className={styles.rateTitle}>
							<span
								tabIndex={0}
								onClick={scrollToReview}
								onKeyDown={key => skipDefEvent(key, { scrollToReview })}>
								{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</span>
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
							<Button
								onClick={() => setIsReviewOpened(!isReviewOpened)}
								appearance={'ghost'}
								arrow={isReviewOpened ? 'down' : 'right'}>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div variants={variantsCard} initial={'close'} animate={isReviewOpened ? 'open' : 'close'}>
						<Card
							color='blue'
							ref={reviewRef}
							className={styles.reviews}
							tabIndex={isReviewOpened ? 0 : -1}>
							{reviews}
							<ReviewForm isReviewOpened={isReviewOpened} productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
