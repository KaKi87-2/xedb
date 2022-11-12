export default ({
    sift
}) => ({
    query,
    _updatedAt
}) => query
    ? data => data._updatedAt === _updatedAt[data._id] && !data._isDeleted && sift(query)(data)
    : data => data._updatedAt === _updatedAt[data._id] && !data._isDeleted;