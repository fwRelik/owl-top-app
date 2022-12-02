import Image from 'next/image';
import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import styles from './Product.module.scss';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';

import ImageNotFound from '../../public/images/img_not_found.png';

export const Product = ({ product, children, className, ...props }: ProductProps): JSX.Element => {
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

	return (
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
				<Button appearance={'primary'}>Узнать подробнее</Button>
				<Button className={styles.reviewButton} appearance={'ghost'} arrow={'right'}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
