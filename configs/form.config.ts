export const formConfig = {
	name: { required: { value: true, message: 'Введите имя' } },
	title: { required: { value: true, message: 'Введите заголовок' } },
	description: { required: { value: true, message: 'Введите описание' } },
	rating: { required: { value: true, message: 'Укажите рейтинг' } },
};

export const responseConfig = {
	success: {
		title: 'Ваш отзыв отправлен.',
		description: 'Спасибо, ваш отзыв будет опубликован после проверки.',
	},
	failed: {
		title: 'Ошибка:',
		description: 'Что-то пошло не так.',
	},
};
