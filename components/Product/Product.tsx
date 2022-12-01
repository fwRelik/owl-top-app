import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import styles from './Product.module.scss';

import ImageIcon from './icons/image.svg';

export const Product = ({ product, children, className, ...props }: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				{product.image ? (
					<img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} />
				) : (
					<ImageIcon />
				)}
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>{product.price}</div>
			<div className={styles.credit}>{product.credit}</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.calculatedRating} />
			</div>
			<div className={styles.tags}>
				<Tag color={'ghost'}>{product.tags[0]}</Tag>
				{/* {product.tags.map(c => (
					<Tag key={c} color={'ghost'}>
						{c}
					</Tag>
				))} */}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
			<div className={styles.hr}>
				<hr className={styles.hr} />
			</div>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.feature}>фичи</div>
			<div className={styles.advBlock}>
				<div className={styles.advantages}>
					<div>Преимущества</div>
					<div>{product.advantages}</div>
				</div>
				<div className={styles.disAdvantages}>
					<div>Недостатки</div>
					<div>{product.disAdvantages}</div>
				</div>
			</div>
			<div className={styles.hr}>
				<hr className={styles.hr} />
			</div>
			<div className={styles.actions}>
				<Button appearance={'primary'}>Узнать подробнее</Button>
				<Button appearance={'ghost'} arrow={'right'}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
