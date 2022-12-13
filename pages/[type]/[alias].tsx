import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../configs/api.config';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { withLayout } from '../../layout/Layout';
import { PageComponent } from '../../page-components';
import Head from 'next/head';
import { pageConfig } from '../../configs';
import { Error404 } from '../404';

function Page({ firstCategory, page, products }: CourseProps): JSX.Element {
	if (!(page && products)) return <Error404 />;

	const seoTitle = page.seoTitle ?? pageConfig.title;
	const seoDescription = page.seoDescription ?? pageConfig.description;

	return (
		<>
			<Head>
				<title>{seoTitle}</title>
				<meta name='title' content={seoTitle} />
				<meta name='description' content={seoDescription} />

				<meta property='og:type' content='article' />
				<meta property='og:title' content={seoTitle} />
				<meta property='og:description' content={seoDescription} />

				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:title' content={seoTitle} />
				<meta property='twitter:description' content={seoDescription} />
			</Head>
			<PageComponent firstCategory={firstCategory} page={page} products={products} />
		</>
	);
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
