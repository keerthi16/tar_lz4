const child = require('child_process');

const platform = process.platform;
module.exports = {

    compression: (pathToFolder, outputPath, cb) => {
        if (platform === 'darwin') {
            child.exec(`tar cvf - ${pathToFolder} | lz4 > ${outputPath}.tar.lz4`, (error, stdout, stderr) => {
                if (error && error.killed) {
                    console.error(`exec error: ${error}`);
                    return null;
                } else {
                    return cb(null, stdout);
                }
            })
        } else if (process.arch === 'ia32') {
            child.exec(`/library/tar-1.13-1-win32/bin/tar.exe cvf - ${pathToFolder} | /library/lz4_v1_8_0_win32/lz4.exe > ${outputPath}.tar.lz4`, (error, stdout, stderr) => {
                if (error && error.killed) {
                    console.error(`exec error: ${error}`);
                    return null;
                } else {
                    return cb(null, stdout);
                }
            })
        } else {
            child.exec(`/library/tar-1.13-1-win64/bin/tar.exe cvf - ${pathToFolder} | /library/lz4_v1_8_0_win32/lz4.exe > ${outputPath}.tar.lz4`, (error, stdout, stderr) => {
                if (error && error.killed) {
                    console.error(`exec error: ${error}`);
                    return null;
                } else {
                    return cb(null, stdout);
                }
            })
        }
    }
};
