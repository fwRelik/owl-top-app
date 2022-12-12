import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { PageComponentProps } from './PageComponent.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { SortEnum } from '../../components/Sort/Sort.props';
import styles from './PageComponent.module.scss';
import { useReducedMotion } from 'framer-motion';

export const PageComponent = ({ page, products, firstCategory }: PageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, {
		products,
		sort: SortEnum.Rating,
	});
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		dispathSort({ type: 'reset', payload: products });
	}, [page]);

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && (
					<Tag color='gray' size='m' aria-label={products.length + 'элементов'}>
						{products.length}
					</Tag>
				)}
				<Sort className={styles.sort} sort={sort} setSort={setSort} />
			</div>
			<div role={'list'}>
				{sortedProducts &&
					sortedProducts.map(p => (
						<Product role={'listitem'} layout={shouldReduceMotion ? false : true} key={p._id} product={p} />
					))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag='h2'>Преимущества</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			<Htag className={styles.skillsTitle} tag='h2'>
				Получаемые навыки
			</Htag>
			{page.tags.map(t => (
				<Tag key={t} color='primary'>
					{t}
				</Tag>
			))}
		</div>
	);
};
