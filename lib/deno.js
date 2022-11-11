import {
    readLines as _readLines
} from 'https://deno.land/std@0.163.0/io/mod.ts';

import query from './query.denoOrBrowser.js';

const
    readLines = async ({
        path,
        onLine
    }) => {
        const file = await Deno.open(
            path,
            {
                read: true,
                write: true,
                create: true
            }
        );
        for await (const line of _readLines(file))
            await onLine(line);
        await file.close();
    },
    appendLine = async ({
        path,
        line
    }) => {
        await Deno.writeTextFile(
            path,
            `${line}\n`,
            {
                create: true,
                append: true
            }
        );
    };

export default {
    readLines,
    appendLine,
    query
};