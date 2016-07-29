const generators = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = (config) => {

  return class Generator extends generators.Base {

    constructor(args, options) {
      super(args, options);

      this.argument('appName', {
        type: String,
        required: false,
        default: path.basename(this.destinationRoot())
      });

      this._normilzeRoot();
    }

    _normilzeRoot() {

      const root = this.destinationPath(this.appName);

      if (fs.existsSync(root)) {
        this.env.error(`${root} directory is exist.`);
      }

      this.destinationRoot(root);
    }

    prompting() {

      return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appName
      }, {
          type: 'input',
          name: 'version',
          message: 'Your project version',
          default: '1.0.0'
        }, {
          type: 'input',
          name: 'main',
          message: 'Your project main script',
          default: 'index.js'
        }, {
          type: 'input',
          name: 'author',
          message: 'Your project author',
          default: ''
        }, {
          type: 'input',
          name: 'license',
          message: 'Your project license',
          default: 'MIT'
        }]).then((answers) => {
          this.answers = answers;
        });

    }

    app() {

      const { main } = this.answers;
      const { index, dirs, rootFiles } = config;

      this.fs.copy(
        this.templatePath(index),
        this.destinationPath(main)
      );

      rootFiles.forEach((file) => {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      });

      dirs.forEach((dir) => {
        mkdirp(this.destinationPath(dir));
      });

    }

    packageJson() {

      const { name, version, main, author, license } = this.answers;
      const { scripts } = config;

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name,
          version,
          main,
          author,
          license,
          scripts: JSON.stringify(scripts)
        }
      );

    }

    install() {
      const { dependencies, devDependencies } = config;
      this.npmInstall(dependencies, { 'save': true });
      this.npmInstall(devDependencies, { 'saveDev': true });
    }

  };
};