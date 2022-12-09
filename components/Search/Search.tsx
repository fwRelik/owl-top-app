import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import styles from './Search.module.scss';
import SearchIcon from '../../public/icons/search.svg';


export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') goToSearch();
	};

	return (
		<div className={cn(styles.search, className)} {...props}>
			<Input
				className={styles.input}
				placeholder={'Поиск...'}
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button className={styles.button} appearance='primary' onClick={goToSearch}>
				<SearchIcon />
			</Button>
		</div>
	);
};
