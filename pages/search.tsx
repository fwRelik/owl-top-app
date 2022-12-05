import axios from 'axios';
import { GetStaticProps } from 'next';
import { API } from '../configs/api.config';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';

function Search(): JSX.Element {
	return <>Search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
		firstCategory,
	});

	return {
		props: {
			menu: Array.isArray(menu) ? menu : [],
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
