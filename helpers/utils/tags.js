const {Environment} = require('./env');

/**
 * Provides tools to interact with env variables.
 */
class TagsClass {


	/**
	 * Constructor.
	 */
	constructor() {
		try {
			if (Cypress.config('allowed_tags')) {
				this.setAllowedTags(Cypress.config('allowed_tags'));
			}
		} catch (e) {
		}
	}

	/**
	 * Init file data.
	 *
	 * @param config  The config
	 * @param allowed_tags_file_path  The default env file path.
	 */
	initConfigData(config, allowed_tags_file_path) {
		config.allowed_tags = require(
			(allowed_tags_file_path[0] === '/' ? '' : process.cwd() + '/')
			+ allowed_tags_file_path);
	}


	/**
	 * Init allowed tags.
	 *
	 * @param allowed_tags
	 */
	setAllowedTags(allowed_tags) {
		if (this.isSetAllowedTags()) {
			throw new Error(`Allowed tags already set.`);
		}
		this.allowed_tags = allowed_tags;
	}

	isSetAllowedTags() {
		return typeof this.allowed_tags !== 'undefined';
	}

	checkDefinition() {
		if (!this.isSetAllowedTags()) {
			throw new Error(`Allowed tags not set yet.`);
		}
	}

	/**
	 * Return true if current context can use tags.
	 *
	 * @param keys
	 *
	 * @returns {*}
	 */
	canUse(...tags) {
		this.checkDefinition();

		tags = tags || ALLOWED_TAGS;
		return (Environment.get('exclude_tags') || []).filter(tag => tags.includes(tag)).length < 1
	}

	/**
	 * Return all allowed tags.
	 *s
	 * @returns {*}
	 */
	getAllTags() {
		this.checkDefinition();
		return this.allowed_tags;
	}
}

module.exports.Tags = new TagsClass();

