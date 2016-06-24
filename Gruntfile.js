module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        simplemocha: {
            options: {
                timeout: 4000,
                retries: 2,
                bail: false,
                slow: 2000,
                fullTrace: true
            },
            all: {
                src: ['tests/**/*.js']
            },
            endtoend: {
                src: ['tests/end-to-end-tests.js']
            },
            integration: {
                src: ['tests/integration/*.js']
            }
        }
    }
    );

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', ['simplemocha:all']);
};