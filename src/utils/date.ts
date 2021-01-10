/**
 * 将任意时间格式转换为当地时间戳
 * @param time any
 * @returns 2021/1/9 下午2:05:52
 */
export function timeTransformation(time) {
    return new Date(time).toLocaleString()
}