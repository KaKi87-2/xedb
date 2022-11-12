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
        _beforeSerialize = data => {
            if(!data._id)
                data._id = runtime.nanoid();
            return data;
        },
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
        deleteMany = async query => {
            const _query = runtime.query(query);
            let deletedCount = 0;
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    if(_query(data)){
                        await runtime.appendLine({
                            path,
                            line: await serializer.serialize({
                                _id: data._id,
                                _isDeleted: true
                            })
                        });
                        deletedCount++;
                    }
                }
            });
            return {
                deletedCount
            };
        },
        insertOne = async data => {
            data = _beforeSerialize(data);
            await runtime.appendLine({
                path,
                line: await afterSerialize(await serializer.serialize(data))
            });
            return data;
        };
    return {
        count,
        deleteMany,
        insertOne
    };
};