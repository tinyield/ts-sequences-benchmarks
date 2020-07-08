// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            'src/**/*.ts'
        ],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.spec.json",
            compilerOptions: {
                "rootDir": "src",
                "sourceMap": true,
                "target": "es5",
                "declaration": true,
                "noImplicitAny": false,
                "module": "Node",
                "resolveJsonModule": true,
                "outDir": "build",
                "importHelpers": true,
                "lib": [
                    "es2016",
                    "dom",
                    "esnext",
                    "esnext.asynciterable"
                ],
                "types": [
                    "jasmine",
                    "node"
                ]
            }
            // transforms: [
            //     require("karma-typescript-es6-transform")({
            //         plugins: ['@babel/plugin-transform-spread'],
            //     })
            // ],
            // reports: {
            //     lcovonly: {
            //         directory: "coverage",
            //         subdirectory:  "./",
            //         filename: "lcov.info"
            //
            //     },
            //     html:{
            //         directory: "coverage",
            //         subdirectory: "./",
            //     }
            // }
        },
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-typescript'),
            require('karma-spec-reporter'),
            require('karma-jasmine-html-reporter'),
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        preprocessors: {
            'src/**/*.ts': [ 'karma-typescript' ]
        },

        reporters: [ 'spec'/*, 'karma-typescript'*/],
        // port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        restartOnFileChange: true
    });
};
