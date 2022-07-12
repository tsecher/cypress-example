const glob = require("glob");
const path = require("path");

const load = function (type, dirs, options) {
    const entities = [];

    dirs = Array.isArray(dirs) ? dirs : [path.resolve(__dirname, '..', '..', type)];

    // Define installer directories.
    dirs.forEach((dir) => {
        glob.sync(path.join(dir, `*/*.${type}.js`))
            .forEach(entity => entities.push(new (require(entity))(options)));
    })

    return entities;
}
module.exports = {
    load: load,
};