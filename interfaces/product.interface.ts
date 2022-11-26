export interface ProductCharacteristic {
	name: string;
	value: string;
}

export interface ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductModel {
	_id: string;
	image: string;
	title: string;
	price: number;
	oldPrice: number;
	credit: number;
	caclulatedRating: number;
	description: string;
	advantages: string;
	disAdvantages: string;
	categories: string[];
	tags: string[];
	characteristics: ProductCharacteristic[];
	createdAt: Date;
	updatedAt: Date;
	reviews: ReviewModel[];
	reviewCount: number;
	reviewAvg: number;
}
