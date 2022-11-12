/** @author https://gist.github.com/davidfurlong/463a83a33b70a3b6618e97ec9679e490 */
export default (key, value) =>
    value instanceof Object
    &&
    !(value instanceof Array)
        ? Object
            .keys(value)
            .sort()
            .reduce((sorted, key) => {
                sorted[key] = value[key];
                return sorted;
            }, {})
        : value;