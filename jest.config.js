module.exports = {
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./setupTests.js'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!<rootDir>/*config.js'
  ],
  preset: '@shelf/jest-mongodb',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
