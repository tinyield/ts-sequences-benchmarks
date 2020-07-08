const scanner = require("sonarqube-scanner");

scanner(
    {
        // this example uses local instance of SQ
        serverUrl: "https://sonarcloud.io/",
        token: process.env.SONAR_TOKEN,
        options: {
            "sonar.organization": "tinyield",
            "sonar.projectKey": "ts-sequences-benchmarks",
            "sonar.projectName": "Sequences Benchmarks for TS",
            "sonar.sources": "src",
            "sonar.inclusions": "**/*.ts",
            "sonar.ts.tslintconfigpath": "tslint.json",
            "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.language": "ts",
            "sonar.branch.name": "master",
            "sonar.sourceEncoding": "UTF-8",
            "sonar.scm.provider": "git",
            "sonar.scm.forceReloadAll": "true"
        },
    },
    () => process.exit()
);
