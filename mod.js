import {
    create as createDatastore
} from './src/datastore.js';

import denoRuntime from './lib/deno.js';
import nodeRuntime from './lib/node.js';
import browserRuntime from './lib/browser.js';
import inMemoryDenoOrBrowserRuntime from './lib/inMemory.denoOrBrowser.js';
import inMemoryNodeRuntime from './lib/inMemory.node.js'

export {
    createDatastore,

    denoRuntime,
    nodeRuntime,
    browserRuntime,
    inMemoryDenoOrBrowserRuntime,
    inMemoryNodeRuntime
};