import {
    readLines as _readLines
} from 'https://deno.land/std@0.163.0/io/mod.ts';

import {
    query,
    nanoid,
    modify
} from './deps.deno.js';

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
        for await (const line of _readLines(file)){
            const isStop = await onLine(line);
            if(isStop)
                break;
        }
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
    },
    rename = async ({
        oldPath,
        newPath
    }) => {
        await Deno.rename(
            oldPath,
            newPath
        );
    };

export default {
    readLines,
    appendLine,
    rename,
    query,
    nanoid,
    modify
};