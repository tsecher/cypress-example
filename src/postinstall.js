const path = require("path");
const fs = require("fs");
const project_path = path.resolve(process.cwd(), '../');

// Write config file.
const config_file_path = path.join(process.cwd(), 'installer.config.json');
if (!fs.existsSync(config_file_path)) {
    const config = {
        project_path: project_path,
    }
    fs.writeFileSync(
        config_file_path,
        JSON.stringify(config)
    )
}
