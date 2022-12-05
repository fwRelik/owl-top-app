import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import styles from './Sort.module.scss';
import SortIcon from './icons/sort.svg';


export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}>
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</span>
			<span
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}>
				<SortIcon className={styles.sortIcon} />
				По цене
			</span>
		</div>
	);
};
