import * as url from "url";

export const getUrlQuery = (urlPath: string, key?: string): string | object => {
	const query = url.parse(urlPath, true).query
	if (key) {
		return query[key]
	} else {
		return query;
	}
};