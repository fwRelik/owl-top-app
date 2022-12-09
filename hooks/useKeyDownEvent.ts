import { KeyboardEvent } from 'react';

export type cbsType = Record<string, (...args: any[]) => void>;

export interface IUseKeyDownEvent {
	skipDefEvent: (key: KeyboardEvent, cbs?: cbsType) => KeyboardEvent;
}

export const useKeyDownEvent = (): IUseKeyDownEvent => {
	const skipDefEvent = (key: KeyboardEvent, cbs?: cbsType): KeyboardEvent => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			if (cbs) for (const key in cbs) cbs[key]();
		}
		return key;
	};

	return { skipDefEvent };
};
