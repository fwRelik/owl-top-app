const public_domain = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
	domain: {
		host: public_domain,
		assets_folder: public_domain + '/static',
	},
	page: {
		find: public_domain + '/api/page/find/',
		byAlias: public_domain + '/api/page/byAlias/',
	},
	product: {
		find: public_domain + '/api/product/find/',
	},
};
