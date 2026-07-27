export function findTemplateElement(id) {
	const template = document.getElementById(id);

	if (!(template instanceof HTMLTemplateElement)) {
		throw new Error(`Missing #${id}.`);
	}

	return template;
}
