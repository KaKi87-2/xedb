import inMemory from './inMemory.js';
import {
    query,
    nanoid
} from './deps.browser.js';

export default {
    ...inMemory,
    query,
    nanoid
};