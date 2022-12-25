import sift from 'npm:sift@16.0.1';
import {
    nanoid
} from 'https://rawcdn.githack.com/ai/nanoid/386e4f921cf95d390266e83b04e35c2e1294db67/index.browser.js';
import {
    modify
} from 'npm:@seald-io/nedb@3.1.0/lib/model.js';

import _query from './query.js';

export const
    query = _query({
        sift
    });

export {
    nanoid,
    modify
};