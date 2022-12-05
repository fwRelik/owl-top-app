import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { withLayout } from '../../layout/Layout';
import { PageComponent } from '../../page-components';

function Page({ firstCategory, page, products }: CourseProps): JSX.Element {
	return <PageComponent firstCategory={firstCategory} page={page} products={products} />;
}

export default withLayout(Page);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
			firstCategory: m.id,
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
	}

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) return { notFound: true };

	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) return { notFound: true };

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.page.find, {
			firstCategory: firstCategoryItem.id,
		});
		if (menu.length == 0) return { notFound: true };

		const { data: page } = await axios.get<PageModel>(API.page.byAlias + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10,
		});

		return {
			props: {
				menu: menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return { notFound: true };
	}
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: PageModel;
	products: ProductModel[];
}
