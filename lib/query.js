export default ({
    sift
}) => query => query
    ? data => !data._isDeleted && sift(query)(data)
    : data => !data._isDeleted;