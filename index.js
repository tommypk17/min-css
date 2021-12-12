const fs = require('fs')

const minify = () => {
    let path = parseArgs()['path'];
    if(path){
        let contents = readFile(path);
        if(contents){
            let compressed = removeSpaces(removeNewLines(removeComments(contents)));
            let success = writeFile(minifyFilePath(path), compressed);
            if(success){
                return success;
            }
        }else{
            throw 'No File Contents or File Not Read';
        }
    }
};

const minifyFilePath = (originalFullPath) => {
    let pathFragments = originalFullPath.split('/');
    let fileName = pathFragments[pathFragments.length-1];
    let fileFragments = fileName.split('.');
    let minifiedFileFragments = [];
    let minifiedFileName = '';
    for(let i = fileFragments.length - 1; i >= 0; i--){
        if(i == fileFragments.length -1){
            minifiedFileFragments[i] = 'min';
            minifiedFileFragments[i + 1] = fileFragments[i];
        }else{
            minifiedFileFragments[i] = fileFragments[i];
        }
    }
    minifiedFileName =  minifiedFileFragments.join('.');
    pathFragments[pathFragments.length-1] = minifiedFileName;
    return pathFragments.join('/');
}

const removeNewLines = (fileContents) => {
    let re = new RegExp(/\r?\n|\r/g);
    return fileContents.replace(re, '');
}

const removeSpaces = (fileContents) => {
    let re = new RegExp(/\s{2,}|\s(?<=[\:\,].)|\s(?=[\{])/g);
    return fileContents.replace(re, '');
}

const removeComments = (fileContents) => {
    let re = new RegExp(/\/\*[\s\S]*?\*\//g);
    return fileContents.replace(re, '');
}

const readFile = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        return null;
    }
}

const writeFile = (path, data) => {
    try{
        fs.writeFileSync(path, data);
        return true
    }catch (err){
        return false;
    }
}

const parseArgs = () => {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
            // long arg
            if (arg.slice(0,2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2,longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1,arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

minify();
