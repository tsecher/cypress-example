const fs = require('fs');
const path = require('path');


class ConfigurationClass {

    constructor() {
        this.config_file_path = path.join(process.cwd(), 'installer.config.json');
        if (fs.existsSync(this.config_file_path)) {
            this.conf = require(this.config_file_path);
        } else {
            this.conf = {};
        }
    }

    /**
     * Get conf.
     *
     * @param key
     * @returns {*|{}}
     */
    get(key) {
        if (key) {
            return this.conf[key]
        }
        return this.conf;
    }

    /**
     * Update conf.
     *
     * @param key
     * @param value
     * @returns {ConfigurationClass}
     */
    set(key, value) {
        this.conf[key] = value;
        this._save();
        return this;
    }

    /**
     * Save conf state in file.
     *
     * @private
     */
    _save() {
        fs.writeFileSync(
            this.config_file_path,
            JSON.stringify(this.conf)
        )
    }

}

module.exports = new ConfigurationClass()