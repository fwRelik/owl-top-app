const public_domain = process.env.NEXT_PUBLIC_DOMAIN;
const u = (val: string) => public_domain + val; // unifying

export const API = {
	domain: {
		host: public_domain,
		assets_folder: u('/static'),
	},
	page: {
		find: u('/api/page/find/'),
		byAlias: u('/api/page/byAlias/'),
	},
	product: {
		find: u('/api/product/find/'),
	},
	review: {
		create: u('/api/review/create/'),
	},
};
