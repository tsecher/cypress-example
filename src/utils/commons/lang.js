let lang_values = null;

/**
 * Load all languaged values.
 *
 * @returns {{}}
 */
function getLangValues(){
    const path = require('path')
    const glob = require("glob");
    const prefix = '.lang.json';
    const pattern = path.resolve(__dirname, '..', '..', '**', `*${prefix}`);

    const all_values = {};

    glob.sync(pattern).forEach( file => {
        const file_name = path.basename(file);
        const local_prefix = file_name.substring(0, file_name.length-(prefix.length));
        const values = require(file);
        Object.keys(values).forEach( key => {
            all_values[`${local_prefix}.${key}`] = values[key];
        })
    })

    return all_values;
}

/**
 * Return languaged string value by key.
 *
 * @param ids
 */
module.exports = function(id){
    lang_values = lang_values ?? getLangValues();
    return lang_values[id] ?? id;
}