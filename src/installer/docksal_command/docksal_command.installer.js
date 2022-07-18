const fs = require('fs');
const path = require('path');
const tfs = require('../../utils/commons/fs-template')
const lang = require('../../utils/commons/lang')('docksal_command');
const messenger = require('../../utils/commons/messenger');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class DocksalCommandInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'docksal_command',
                groups: ['dev'],
                title: lang('title'),
                description: lang('description'),
            }
        };
    }

    /**
     * Check if project is elligible.
     *
     * Project is eligible if .docksal rep exists
     * and .docksal/cypress/run does not exist yet
     *
     *
     * @private
     */
    _isEligible() {
        return fs.existsSync(this.getDocksalRepPath())
            && !fs.existsSync(this.getDocksalCommandPath())
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doInstall() {
        tfs.copyTpl(
            path.join(__dirname, 'template'),
            path.join(this.getDocksalCommandPath(), '..'),
            {
                'dir': this.getTestDir(),
                'cypress_version': this.getCypressVersion(),
            });
        await tfs.commit();

        messenger.info(lang('end'));
    }

    /**
     * Return the .docksal rep path.
     */
    getDocksalRepPath() {
        return path.join(this.options.project_path, '.docksal')
    }

    /**
     * Return the .docksal/cypress/run file path.
     *
     * @returns {string}
     */
    getDocksalCommandPath() {
        return path.join(this.getDocksalRepPath(), 'commands', 'cypress', 'run')
    }

    /**
     * Return the current cypress version in package.json
     */
    getCypressVersion() {
        return require('cypress/package.json').version
    }

    /**
     * Return the test repertory name.
     */
    getTestDir() {
        return path.basename(this.options.test_path);
    }

}

module.exports = DocksalCommandInstaller;