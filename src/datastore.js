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
        _updatedAt = {},
        _beforeSerialize = data => {
            if(!data._id)
                data._id = runtime.nanoid();
            data._updatedAt = _updatedAt[data._id] = new Date().toISOString();
            return data;
        },
        load = async () => {
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    _updatedAt[data._id] = data._updatedAt;
                }
            });
        },
        count = async query => {
            const _query = runtime.query({
                query,
                _updatedAt
            });
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
        deleteOne = async query => {
            const _query = runtime.query({
                query,
                _updatedAt
            });
            let deletedCount = 0;
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    if(_query(data)){
                        await runtime.appendLine({
                            path,
                            line: await serializer.serialize(_beforeSerialize({
                                _id: data._id,
                                _isDeleted: true
                            }))
                        });
                        deletedCount++;
                        return true;
                    }
                }
            });
            return {
                deletedCount
            };
        },
        deleteMany = async query => {
            const _query = runtime.query({
                query,
                _updatedAt
            });
            let deletedCount = 0;
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    if(_query(data)){
                        await runtime.appendLine({
                            path,
                            line: await serializer.serialize(_beforeSerialize({
                                _id: data._id,
                                _isDeleted: true
                            }))
                        });
                        deletedCount++;
                    }
                }
            });
            return {
                deletedCount
            };
        },
        find = async query => {
            const
                _query = runtime.query({
                    query,
                    _updatedAt
                }),
                result = [];
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    if(_query(data))
                        result.push(data);
                }
            });
            return result;
        },
        findOne = async query => {
            const _query = runtime.query({
                query,
                _updatedAt
            });
            let result;
            await runtime.readLines({
                path,
                onLine: async line => {
                    const data = await serializer.deserialize(await beforeDeserialize(line));
                    if(_query(data)){
                        result = data;
                        return true;
                    }
                }
            });
            return result;
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
        load,
        count,
        deleteOne,
        deleteMany,
        find,
        findOne,
        insertOne
    };
};