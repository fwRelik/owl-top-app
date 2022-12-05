import axios from 'axios';
import { GetStaticProps } from 'next';
import { Input, Textarea } from '../components';
import { API } from '../configs/api.config';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';

function Home({ menu }: HomeProps): JSX.Element {
	return (
		<>
			{menu.map(m => (
				<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
			))}
			<Input placeholder={'Input Component'} />
			<Textarea placeholder={'Textarea Component'} />
		</>
	);
}

export default withLayout(Home);

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
