/* 过滤对象中的空的提交到后台 */
export const fileObjectField = (data: object): object => {
	return Object.keys(data).reduce((cur, next) => {
		if (data[next] || /^\d+$/.test(data[next])) {
			cur[next] = data[next]
		}
		return cur
	}, {})
}