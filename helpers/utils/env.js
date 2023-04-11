/**
 * Provides tools to interact with env variables.
 */
class EnvironmentClass {

	constructor() {
		try {
			if (Cypress.config('default_env_values')) {
				this.setDefaultEnv(Cypress.config('default_env_values'));
			}
		} catch (e) {
		}
	}

	/**
	 * Init file data.
	 *
	 * @param config  The config
	 * @param defaultEnvFile  The default env file path.
	 */
	initConfigData(config, default_env_file_path) {
		config.default_env_values = require(
			(default_env_file_path[0] === '/' ? '' : process.cwd() + '/')
			+ default_env_file_path);
	}

	/**
	 * Init default environment values.
	 *
	 * @param default_env_values
	 */
	setDefaultEnv(default_env_values) {
		if (this.isSetDefaultEnv()) {
			throw new Error(`Default environment values already set.`);
		}
		this.default_env_values = default_env_values;
	}

	isSetDefaultEnv() {
		return typeof this.default_env_values !== 'undefined';
	}

	checkDefinition() {
		if (!this.isSetDefaultEnv()) {
			throw new Error(`Default environment values not set yet.`);
		}
	}

	/**
	 * Return values by prirority of definition :
	 *  1. In default env values (cypress.config.json)
	 *  2. In Cypress.env('data')
	 *
	 * @param keys The obj keys list.
	 *
	 * @returns {*}
	 */
	get(...keys) {
		this.checkDefinition();

		const envValue = this.deepGet(Cypress.env('data'), keys);
		return envValue === null ? this.deepGet(this.default_env_values.data, keys) : envValue;
	}

	/**
	 * Return default environment values.
	 *
	 * @returns {*}
	 */
	getEnvironmentValues() {
		this.checkDefinition();

		return this.default_env_values;
	}

	/**
	 * Return value in nested object.
	 *
	 * @param obj The parent
	 * @param keys The list of keys
	 *
	 * @returns {*}
	 */
	deepGet(obj, keys) {
		return keys.reduce((xs, x) => (xs && xs[x] !== null && xs[x] !== undefined ? xs[x] : null), obj);
	}
}

module.exports.Environment = new EnvironmentClass();