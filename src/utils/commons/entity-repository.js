const glob = require("glob");
const path = require("path");
const conf = require("./configuration")

/**
 * Return the list of dirs.
 *
 * @param type
 * @returns {*[]}
 */
function getDirs(type) {
    const dirs = []
    conf.getPlugins().forEach(
        plugin => {
            const dir_path = path.resolve('node_modules', plugin, 'src', type)
            dirs.push(dir_path);
        }
    )
    return dirs;
}

/**
 * Load all entity files.
 *
 * @param type
 * @param dirs
 * @param options
 * @returns {*[]}
 */
const load = function (type, dirs, options) {
    const entities = [];

    dirs = Array.isArray(dirs) ? dirs : getDirs(type);

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