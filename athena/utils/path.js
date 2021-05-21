const path = require('athena/utils/path');

const getRootDirectory = function () {
    const dir = __dirname.split(path.sep);
    const root_dir = dir.slice(0, dir.length - 1);
    return path.join(root_dir.join(path.sep));
};

const getPublicDirectory = function () {
    return getRootDirectory() + path.sep + "public" + path.sep;
};

const getConfigDirectory = function () {
    return getRootDirectory() + path.sep + "config" + path.sep;
};

const getTempDirectory = () => {
    return getRootDirectory() + path.sep + "temp" + path.sep;
};

const getLogFile = function () {
    return getRootDirectory() + path.sep + "error.log";
};

module.exports.getRootDirectory = getRootDirectory;
module.exports.getPublicDirectory = getPublicDirectory;
module.exports.getConfigDirectory = getConfigDirectory;
module.exports.getTempDirectory = getTempDirectory;
module.exports.getLogFile = getLogFile;
