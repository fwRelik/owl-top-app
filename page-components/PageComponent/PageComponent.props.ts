import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface PageComponentProps {
	firstCategory: TopLevelCategory;
	page: PageModel;
	products: ProductModel[];
}
