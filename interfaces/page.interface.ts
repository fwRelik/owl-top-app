export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export interface PageAdvantage {
	_id: string;
}

export interface HhData {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
	_id: string;
}

export interface PageModel {
	_id: string;
	firstCategory: TopLevelCategory;
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	advantages: PageAdvantage[];
	seoText: string;
	tagsTitle: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	hh: HhData;
}
