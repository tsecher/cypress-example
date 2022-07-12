const fs = require('fs');
const path = require('path');
const tfs = require('../../utils/commons/fs-template');

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
                groups: ['default'],
                title: "Répertoire des specification",
                description: "Construit le repertoires des specs",
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
    _doInstall() {
        // @todo.
        tfs.copy(
            path.join(__dirname,'template'),
            this.getSpecRepository()
        );
        tfs.commit();
    }

    /**
     *
     * @param repoName
     * @returns {string}
     */
    getSpecRepository(repoName = 'e2e'){
        return path.join(this.options.project_path, repoName);
    }

}

module.exports = SpecsInitInstaller;