const fs = require('fs');
const path = require('path');

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
                groups: ['dev'],
                title: "Docksal command",
                description: "Ajouter une commande docksal pour lancer les tests",
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

module.exports = DocksalCommandInstaller;