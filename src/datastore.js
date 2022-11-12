export const create = ({
    path,
    runtime,
    serializer = {
        serialize: data => JSON.stringify(data),
        deserialize: data => JSON.parse(data)
    },
    afterSerialize = data => data,
    beforeDeserialize = data => data
}) => {
    const
        count = async query => {
            const _query = runtime.query(query);
            let count = 0;
            await runtime.readLines({
                path,
                onLine: async line => {
                    if(_query(await serializer.deserialize(await beforeDeserialize(line))))
                        count++;
                }
            });
            return count;
        },
        insertOne = async data => {
            await runtime.appendLine({
                path,
                line: await afterSerialize(await serializer.serialize(data))
            });
        };
    return {
        count,
        insertOne
    };
};