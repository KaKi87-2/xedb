import inMemory from './inMemory.js';
import {
    query,
    nanoid
} from './deps.deno.js';

export default {
    ...inMemory,
    query,
    nanoid
};