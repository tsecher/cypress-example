const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

const store = memFs.create();
module.exports = editor.create(store);