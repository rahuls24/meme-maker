export async function makeMeme(payload: any) {
	const formData = new FormData();
	const username = process.env.USERNAME??'';
	const password = process.env.PASSWORD??'';
	formData.append('username', username);
	formData.append('password', password);
	formData.append('template_id', payload.templedId);
	if (payload.textFontSize !== 50)
		formData.append('max_font_size', payload.textFontSize);
	if (Array.isArray(payload.captionList)) {
		payload.captionList.forEach((c: any, index: any) => {
			formData.append(`boxes[${index}][text]`, c);
			if (
				payload.textColor !== '#000000' ||
				payload.outlineTextColor !== '#ffffff'
			) {
				formData.append(`boxes[${index}][color]`, payload.textColor);
				formData.append(
					`boxes[${index}][outline_color]`,
					payload.outlineTextColor,
				);
			}
		});
	}

	const requestOptions = {
		method: 'POST',
		body: formData,
	};
	try {
		const response = await fetch(
			'https://api.imgflip.com/caption_image',
			requestOptions,
		);
		if (response) return await response.json();
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error('Something went wrong');
	}
}
