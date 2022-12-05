export interface IReviewForm {
	name: string;
	title: string;
	description: string;
	rating: number;
}

export interface IReviewSentResponse {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}