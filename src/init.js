const prompts = require('prompts');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).argv;

const processInstall = require('./utils/installers/install-processor');

// Define project path
const project_path = path.resolve(process.cwd(), '../');

const options = {
    test_eligibility: !args.force,
}

prompts([{
    type: 'text',
    name: 'project_path',
    message: 'Quel est le répertoire racine du projet ?',
    initial: project_path,
}]).then((values) => processInstall({...options, ...values}))
