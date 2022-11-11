import {
    createReadStream
} from 'node:fs';
import {
    createInterface
} from 'node:readline';
import {
    appendFile
} from 'node:fs/promises';

import query from './query.node.js';

const
    readLines = async ({
        path,
        onLine
    }) => {
        for await (const line of createInterface({
            input: createReadStream(
                path,
                {
                    flags: 'a+'
                }
            ),
            crlfDelay: Infinity
        })){
            await onLine(line);
        }
    },
    appendLine = async ({
        path,
        line
    }) => {
        await appendFile(
            path,
            `${line}\n`,
            {
                flag: 'a+'
            }
        );
    };

export default {
    readLines,
    appendLine,
    query
};