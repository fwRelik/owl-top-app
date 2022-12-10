import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	productId: string;
	isReviewOpened?: boolean;
}
