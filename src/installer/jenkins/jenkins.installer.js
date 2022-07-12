const fs = require('fs');
const path = require('path');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class JenkinsInstaller extends InstallerAbstract {

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
                title: "Jenkins",
                description: "Ajout d&#39;une tache cypress pour jenkins",
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

module.exports = JenkinsInstaller;