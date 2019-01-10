// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.tsxsxs

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
    
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    './src/features/*.feature'
  ],
  cucumberOpts: {
    require: ['./src/steps/*.ts'],
    strict: true,
    dryRun: false,
    compiler: [],
    format: 'json:./e2e/results.json'
  },
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true
    }
  }],
  onPrepare() {
    var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

    chai.use(chaiAsPromised);
    global.expect = chai.expect;
    
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }
};
