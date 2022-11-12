import {
    query
} from './deps.denoOrBrowser.js';

const
    readLines = async ({
        path,
        onLine
    }) => {
        const file = localStorage.getItem(path);
        if(file){
            for(const line of file.split('\n')){
                if(line)
                    await onLine(line);
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
    };

export default {
    readLines,
    appendLine,
    query
};