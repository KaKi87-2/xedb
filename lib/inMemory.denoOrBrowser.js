import inMemory from './inMemory.js';
import {
    query,
    nanoid
} from './deps.denoOrBrowser.js';

export default {
    ...inMemory,
    query,
    nanoid
};