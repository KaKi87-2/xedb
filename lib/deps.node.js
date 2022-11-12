import sift from 'sift';
import {
    nanoid
} from 'nanoid';

import _query from './query.js';

export const
    query = _query({
        sift
    });

export {
    nanoid
};