import {
    query,
    nanoid,
    modify
} from './deps.browser.js';

const
    readLines = async ({
        path,
        onLine
    }) => {
        const file = localStorage.getItem(path);
        if(file){
            for(const line of file.split('\n')){
                if(line){
                    const isStop = await onLine(line);
                    if(isStop)
                        break;
                }
            }
        }
    },
    appendLine = ({
        path,
        line
    }) => {
        localStorage.setItem(
            path,
            `${localStorage.getItem(path) || ''}${line}\n`
        );
    },
    rename = async ({
        oldPath,
        newPath
    }) => {
        localStorage.setItem(newPath, localStorage.getItem(oldPath));
        localStorage.removeItem(oldPath);
    };

export default {
    readLines,
    appendLine,
    rename,
    query,
    nanoid,
    modify
};