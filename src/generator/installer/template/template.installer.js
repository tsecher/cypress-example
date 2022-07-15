const fs = require('fs');
const path = require('path');

const lang = require('../../utils/commons/lang')('<%= id %>');
const messenger = require('../../utils/commons/messenger');
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
                id: '<%= id %>',
                groups: ['<%- groups.join("','") %>'],
                title: lang('title'),
                description: lang('description'),
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