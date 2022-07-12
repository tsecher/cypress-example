const fs = require('fs');
const path = require('path');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class GitlabCiInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                groups: ['ci'],
                title: "Gitlab CI",
                description: "Ajout d&#39;une tache cypress dans le .gitlab-ci.yml",
            }
        };
    }

    /**
     * Check if project is elligible.
     *
     * @private
     */
    _isEligible() {
        // @todo
        return true;
    }

    /**
     * Generate.
     *
     * @private
     */
    _doInstall() {
        // @todo.
    }

}

module.exports = GitlabCiInstaller;