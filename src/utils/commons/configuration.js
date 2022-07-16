const fs = require('fs');
const path = require('path');


class ConfigurationClass {

    constructor() {
        this.config_file_path = path.join(process.cwd(), 'installer.config.json');
        this.init();
    }

    /**
     * Init conf file.
     */
    init() {
        if (fs.existsSync(this.config_file_path)) {
            this.conf = require(this.config_file_path);
        } else {
            this.conf = {};
            this.set('project_path', path.resolve(process.cwd(), '../'));
        }

        return this;
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

    /**
     * Add a plugin in conf.
     *
     * @param plugin
     * @returns {ConfigurationClass}
     */
    addPlugin(plugin) {
        const plugins = conf.get('plugins') || [];
        plugins.push(plugin);
        this.set('plugins', plugins);
        return this;
    }

}

module.exports = new ConfigurationClass()