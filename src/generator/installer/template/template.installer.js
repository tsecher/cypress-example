const fs = require('fs');
const path = require('path');

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class <%= class_name %> extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                groups: ['<%- groups.join("','") %>'],
                title: "<%= name %>",
                description: "<%= description %>",
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

module.exports = <%= class_name %>;