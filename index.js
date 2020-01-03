#!/user/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const createFile = (name, extension) => {
    const path = `${process.cwd()}/${name}.${extension}`;
    shelljs.touch(path);
    return path;
};
const opts = () => {
    const options = [{
            name: 'FILE',
            type: 'input',
            message: 'File name?, (without extension)'
        },
        {
            name: 'EXTENSION',
            type: 'list',
            message: 'File extension?',
            choices: ['.rb', '.js', '.kt', '.java', '.ts', '.php'],
            filter: function(val) {
                return val.split('.')[1];
            }
        }
    ];
    return inquirer.prompt(options);
}
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('N.C.R. CLI', {
                font: 'Bubble',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
};

const exec = async() => {
    //TODO: show information in header
    init();
    //TODO: Questions for create file
    const selectedOptions = await opts();
    const { FILE, EXTENSION } = selectedOptions;
    console.log(selectedOptions);
    //TODO: Create file
    const filePath = createFile(FILE, EXTENSION);
    console.log(filePath);
    //TODO: Message with satus 
    console.log(`File created successfully in ${filePath}`);
};

exec();