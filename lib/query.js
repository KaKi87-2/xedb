export default ({
    sift
}) => query => query
    ? sift(query)
    : () => true;