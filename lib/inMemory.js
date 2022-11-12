const _lines = {};

const
    readLines = async ({
        path,
        onLine
    }) => {
        const lines = _lines[path];
        if(lines){
            for(const line of lines){
                const isStop = onLine(line);
                if(isStop)
                    break;
            }
        }
    },
    appendLine = async ({
        path,
        line
    }) => {
        if(!_lines[path])
            _lines[path] = [];
        _lines[path].push(line);
    };

export default {
    readLines,
    appendLine
};