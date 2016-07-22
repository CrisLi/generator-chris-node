const generators = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');

class Generator extends generators.Base {

  constructor(args, options) {
    super(args, options);
  }

  prompting() {

    const rootPath = this.destinationRoot();

    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : path.basename(rootPath)
    }, {
      type    : 'input',
      name    : 'version',
      message : 'Your project version',
      default : '1.0.0'
    }, {
      type    : 'input',
      name    : 'main',
      message : 'Your project main script',
      default : 'index.js'
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Your project author',
      default : ''
    }, {
      type    : 'input',
      name    : 'license',
      message : 'Your project license',
      default : 'MIT'
    }]).then((answers) => {
      this.answers = answers;
    });

  }

  app() {

    const { main } = this.answers;

    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('.vscode'),
      this.destinationPath('.vscode')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath(main)
    );

    mkdirp(this.destinationPath('src'));

  }

  packageJson() {

    const { name, version, main, author, license } = this.answers;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), 
      {
        name,
        version,
        main,
        author,
        license
      }
    );

  }

  install() {
    this.npmInstall(['lodash'], { 'save': true });
    this.npmInstall(['eslint', 'babel-eslint', 'eslint-plugin-babel'], { 'saveDev': true });
  }

};

module.exports = Generator;