const prompts = require('prompts');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).argv;

const lang = require('./utils/commons/lang')('commons');

const installProcessor = require('./utils/installers/install-processor')
const messenger = require('./utils/commons/messenger');

// Define options.
const project_path = path.resolve(process.cwd(), '../');
const options = {
    test_eligibility: !args.force,
    verbose: args.v === true
}

////////////////////////
///// List all available installers.
if( args.l || args.list){
    // Direct install
    installProcessor.listInstallers();
    return;
}

////////////////////////
///// Launch direct installer
if (args['_'].length) {
    options.project_path = project_path;

    // Direct install
    installProcessor.directInstall(args['_'], options);
    return;
}

////////////////////////
///// Launch available all installer wizzard
prompts([{
    type: 'text',
    name: 'project_path',
    message: lang('root_project'),
    initial: project_path,
}]).then((values) => installProcessor.promptInstall({...options, ...values}))
