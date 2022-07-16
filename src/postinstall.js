const conf = require('./utils/commons/configuration');
const path = require('path');
conf.set('project_path', path.resolve(process.cwd(), '../'));
