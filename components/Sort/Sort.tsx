import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import styles from './Sort.module.scss';
import SortIcon from '../../public/icons/sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>
				Сортировка
			</div>
			<button
				id='rating'
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort rating'>
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</button>
			<button
				id='price'
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby='sort price'>
				<SortIcon className={styles.sortIcon} />
				По цене
			</button>
		</div>
	);
};
