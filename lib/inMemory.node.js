import inMemory from './inMemory.js';
import {
    query,
    nanoid
} from './deps.node.js';

export default {
    ...inMemory,
    query,
    nanoid
};