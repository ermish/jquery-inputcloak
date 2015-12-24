module.exports = function (grunt) {
    'use strict';

    var bundleName = "jquery-inputcloak";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist"],
        babel: {
            "options": {
                "sourceMap": true,
                "experimental": true,
                "modules": "ignore"//"common"
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "src",
                    "src": ["**/*.es6.js"],
                    "dest": "dist",
                    "ext": "last"
                }]
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                       ["babelify", {
                           loose: "all",
                           "experimental": true,
                           "modules": "ignore"//"common"
                       }]
                    ],

                    browserifyOptions : {
                        debug: true
                    }
                }
            },
            files: {
                "expand": true,
                "cwd": "src",
                "src": ["**/*.es6.js"],
                "dest": "dist",
                "ext": ".js"
            },

        },
        uglify: {
            options: {
                banner: '/*! * Copyright (c) 2010 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n> */ ',
                sourceMap : true,
                sourceMapIncludeSources : true

            },
            build: {
                src: 'dist/' + bundleName + '.js',
                dest: 'dist/' + bundleName + '.min.js'
            }
        },
        watch: {
            js: {
                files: ["components/**/*.js"],
                tasks: ['newer:babel', 'browserify']
            }
        }
});

    // Load the plugin that provides the tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['clean', 'browserify']);
    grunt.registerTask('build', [ 'uglify']);
}
