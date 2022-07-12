const path = require('path');
const prompts = require('prompts');
const repo = require('../commons/entity-repository');

class InstallProcessorClass {

    /**
     * Constructor.
     *
     * @param options
     */
    constructor(options) {
        this.options = {
            ...this.getDefaultOptions(),
            ...options,
        };
    }

    /**
     * Default options.
     */
    getDefaultOptions() {
        return {
            project_path: process.cwd(),
            test_eligibility: true,
            installers: {
                dirs: [path.join(process.cwd(), 'src', 'installers')],
            }
        }
    }

    /**
     * Run all installer processors.
     */
    async run() {
        let installers = this._getAllInstallers();
        this.runMandatoryEliglibleInstallers(installers);

        // Filter installers after elligibility done.
        installers = this._getFilterEligibleInstallers(installers);
        const groups = this._getAllAvailableGroups(installers);

        if (groups.length) {
            this._askGroupsQuestions(groups, installers);
        } else {
            this._askInstallersQuestions(installers);
        }
    }

    /**
     * Return the list of available installers.
     *
     * @private
     */
    _getAllInstallers() {
        return repo.load('installer', null, this.options);
    }

    /**
     * Return filtered list of eligible installers.s
     * @private
     */
    _getFilterEligibleInstallers(installers) {
        if (!this.options.test_eligibility) {
            return installers;
        }

        return installers.filter(installer => {
            return !installer.info()?.mandatory && typeof installer.isEligible === 'function' && installer.isEligible();
        })
    }

    /**
     * Return the list of all groups.
     *
     * @returns {*}
     * @private
     */
    _getAllAvailableGroups(installers) {
        const groups = {};

        repo.load('group', null, null)
            .sort((a, b) => {
                return a.info().weight - b.info().weight;
            })
            .forEach(group => {
                const info = group.info();
                group.installers = []
                groups[info.id] = group;
            })

        const default_group = groups.default ?? {installers: []};

        // Dispatch installers in their groups.
        installers.forEach(installer => {
            installer.info().groups
                .forEach(installer_group => {
                    (groups[installer_group] ?? default_group).installers.push(installer)
                })
        })

        return Object.values(groups).filter(group => group.installers.length);
    }

    /**
     * Installer selections.
     *
     * @param installers
     * @private
     */
    async _askInstallersQuestions(installers) {
        // Ask witch installer to install.
        const values = await prompts([{
            type: 'multiselect',
            name: 'installers',
            message: 'Quels éléments voulez-vous mettre en place ?',
            instructions: false,
            choices: installers.map(installer => {
                const info = installer.info();
                return {
                    value: info.id,
                    title: `${info.title} : ${info.description}`,
                    selected: false,
                }
            })
        }])

        // Run selected installers.
        installers
            .filter(installer => {
                return values.installers?.indexOf(installer.info().id) > -1;
            })
            .forEach(installer => {
                try {
                    installer.install();
                } catch (e) {
                    console.error(`Cannot install : ${installer.info().id}`);
                }
            })
    }

    /**
     * Group selections
     *
     * @param groups
     * @private
     */
    async _askGroupsQuestions(groups) {
        const values = await prompts([{
            type: 'multiselect',
            name: 'groups',
            message: 'Quels type d\'éléments voulez-vous mettre en place ?',
            instructions: false,
            choices: groups.map(group => {
                const info = group.info();
                return {
                    value: info.id,
                    title: `${info.title} : ${info.description}`,
                    selected: false,
                }
            })
        }])

        // Installers.
        const filtered_groups = groups
            .filter(group => values.groups?.indexOf(group.info().id) > -1);
        for (let i in filtered_groups) {
            await this._askInstallersQuestions(filtered_groups[i].installers);
        }
    }

    /**
     * Run mandatory eligible tasks.
     *
     * @param installers
     */
    runMandatoryEliglibleInstallers(installers) {
        installers
            .filter(installer => installer.info().mandatory && installer.isEligible())
            .forEach(installer => installer.install())
    }
}

module.exports = function (options) {
    const installProcessor = new InstallProcessorClass(options);
    installProcessor.run();
}