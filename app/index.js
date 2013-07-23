'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var TaramGenerator = module.exports = function TaramGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TaramGenerator, yeoman.generators.Base);

TaramGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [];

    this.prompt(prompts, function (props) {
            cb();
        }.bind(this));
};

TaramGenerator.prototype.app = function app() {
    this.copy('bower.json', 'bower.json');
    this.copy('package.json', 'package.json');
    this.template('Gruntfile.js');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');

    this.mkdir('app');
    this.mkdir('app/css');
    this.mkdir('app/img');
    this.mkdir('app/js');
    this.mkdir('app/scss');
    this.copy('config.rb', 'app/config.rb');
    this.write('app/index.html', this.indexFile);
};
