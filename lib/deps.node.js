import sift from 'sift';
import {
    nanoid
} from 'nanoid';
import {
    modify
} from 'nedb-model/lib/model.js';

import _query from './query.js';

export const
    query = _query({
        sift
    });

export {
    nanoid,
    modify
};