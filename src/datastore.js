import jsonSortReplacer from '../lib/jsonSortReplacer.js';

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
        deleteOne = async (
            query,
            {
                _isReturnDocument
            } = {}
        ) => {
            const _query = runtime.query({
                query,
                _updatedAt
            });
            let
                deletedCount = 0,
                result;
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
                        result = data;
                        return true;
                    }
                }
            });
            return _isReturnDocument
                ? result
                : {
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
        distinct = async (
            field,
            query
        ) => {
            const
                _query = runtime.query({
                    query,
                    _updatedAt
                }),
                values = new Set(),
                result = [];
            await runtime.readLines({
                path,
                onLine: async line => {
                    const
                        data = await serializer.deserialize(await beforeDeserialize(line)),
                        value = JSON.stringify(data[field], jsonSortReplacer);
                    if(_query(data) && value && !values.has(value)){
                        values.add(value);
                        result.push(data);
                    }
                }
            });
            return result;
        },
        estimatedDocumentCount = () => Object.keys(_updatedAt).length,
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
        },
        findOneAndReplace = async (
            query,
            data,
            {
                returnDocument = 'before'
            } = {}
        ) => {
            const
                oldResult = await findOne(query),
                newResult = await insertOne({
                    ...data,
                    _id: oldResult._id
                });
            return returnDocument === 'before'
                ? oldResult
                : returnDocument === 'after'
                    ? newResult
                    : undefined;
        },
        insertMany = async data => {
            const result = [];
            for(const item of data)
                result.push(await insertOne(item));
            return result;
        };
    return {
        load,
        count,
        countDocuments: count,
        deleteMany,
        deleteOne,
        distinct,
        estimatedDocumentCount,
        find,
        findOne,
        findOneAndDelete: query => deleteOne(
            query,
            {
                _isReturnDocument: true
            }
        ),
        findOneAndReplace,
        insertMany,
        insertOne
    };
};