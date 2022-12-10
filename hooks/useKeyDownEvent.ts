import { KeyboardEvent } from 'react';

export type cbsType = Record<string, (...args: any[]) => void> | null;
export type optionsType = 'spaceenter' | 'arrows' | 'all';

export interface IUseKeyDownEvent {
	skipDefEvent: (key: KeyboardEvent, cbs?: cbsType, options?: optionsType) => KeyboardEvent;
}

export const useKeyDownEvent = (): IUseKeyDownEvent => {
	const skipDefEvent = (key: KeyboardEvent, cbs?: cbsType, options: optionsType = 'spaceenter'): KeyboardEvent => {
		const arrows = ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'];
		const spaces = ['Space', 'Enter'];
		let array: string[] = [];

		switch (options) {
			case 'spaceenter':
				array = array.concat(spaces);
				break;
			case 'arrows':
				array = array.concat(arrows);
				break;
			case 'all':
				array = array.concat(arrows, spaces);
				break;
			default:
				throw new Error('Type error');
		}

		array.forEach(codeString => {
			if (key.code == codeString) {
				key.preventDefault();
				if (cbs) for (const key in cbs) cbs[key]();
			}
		});

		// if (key.code == 'Space' || key.code == 'Enter') {
		// 	key.preventDefault();
		// 	if (cbs) for (const key in cbs) cbs[key]();
		// }
		return key;
	};

	return { skipDefEvent };
};
