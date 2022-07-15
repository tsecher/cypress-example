const fs = require('fs');
const path = require('path');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class JenkinsCiInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'jenkins_ci',
                groups: ['ci'],
                title: "Jenkins CI",
                description: "Jenkins CI",
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

module.exports = JenkinsCiInstaller;