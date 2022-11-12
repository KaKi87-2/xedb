import {
    query,
    nanoid
} from './deps.denoOrBrowser.js';

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
    };

export default {
    readLines,
    appendLine,
    query,
    nanoid
};