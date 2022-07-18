const fs = require('fs');
const path = require('path');
const tfs = require('../../utils/commons/fs-template');
const lang = require('../../utils/commons/lang')('specs_init');
const messenger = require('../../utils/commons/messenger');
const prompts = require('prompts');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class SpecsInitInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'specs_init',
                groups: ['default'],
                title: lang('title'),
                description: lang('description'),
                mandatory: true,
            }
        };
    }

    /**
     * Check if project is elligible.
     *
     * @private
     */
    _isEligible() {
        return !fs.existsSync(path.join(this.getSpecRepository(), 'cypress.config.js'));
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doInstall() {
        const values = await this._getValues();

        // e2e files.
        tfs.copyTpl(
            path.join(__dirname, 'template', 'e2e'),
            this.getSpecRepository(),
            values
        );

        // Git ignore
        tfs.conditionalAppendOrCreateTpl(
            path.join(__dirname, 'template', '_.gitignore'),
            path.join(this.options.project_path, '.gitignore'),
            {dir: this.getTestDirname()}
        );
        tfs.commit();

        // Message : OK.
        messenger.info(lang('end'));
    }

    /**
     * Return the test repository path.
     *
     * @param repoName
     * @returns {string}
     */
    getSpecRepository() {
        return path.resolve(this.options.test_path);
    }

    /**
     * Return the test repertory name.
     */
    getTestDirname() {
        return path.basename(this.options.test_path);
    }

    /**
     * Return options
     * @returns {Promise<*|{}>}
     * @private
     */
    async _getValues() {
        return await prompts([
            {
                type: 'toggle',
                name: 'pass_on_console_error',
                message: lang('pass_on_console_error'),
                initial: true,
                active: 'oui',
                inactive: 'non'
            },
        ]);
    }
}

module.exports = SpecsInitInstaller;