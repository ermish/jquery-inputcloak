module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            "options": {
                "sourceMap": false,
                "experimental": true,
                "modules": "ignore"//"common"
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "components",
                    "src": ["**/*.es6.js"],
                    "dest": "components",
                    "ext": ".js"
                }]
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                       ["babelify", {
                           loose: "all"
                       }]
                    ]
                }
            },
            js: {
                //TODO: make has work
                src: 'karma.conf.js',
                dest: 'bin/components/bundle.js'
            }
        },
        watch: {
            js: {
                files: ["components/**/*.js"],
                tasks: ['newer:babel', 'newer:browserify']
            }
        }
});

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('dev', ['watch:js']);
    grunt.registerTask('prod', ['babel', 'browserify']);
}
