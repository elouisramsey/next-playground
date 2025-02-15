export const getTruncatedTitle = (
	title?: string,
	originalTitle?: string,
	maxLength: number = 18
) => {
	const validTitle = title || originalTitle || 'Untitled'
	return validTitle.length > maxLength
		? `${validTitle.slice(0, maxLength - 1)}...`
		: validTitle
}
