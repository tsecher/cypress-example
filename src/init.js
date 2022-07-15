const prompts = require('prompts');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).argv;

const lang = require('./utils/commons/lang');
const installProcessor = require('./utils/installers/install-processor')
const messenger = require('./utils/commons/messenger');

// Define project path
const project_path = path.resolve(process.cwd(), '../');
const options = {
    test_eligibility: !args.force,
    verbose: args.v === true
}

if (args['_'].length) {
    options.project_path = project_path;

    // Direct install
    installProcessor.directInstall(args['_'], options);
} else {
    // Prompts wich installer to execute.
    prompts([{
        type: 'text',
        name: 'project_path',
        message: lang('commons.root_project'),
        initial: project_path,
    }]).then((values) => installProcessor.promptInstall({...options, ...values}))
}

