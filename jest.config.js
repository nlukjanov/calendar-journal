module.exports = {
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./setupTestsBack.js'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!<rootDir>/*config.js',
    '!<rootDir>/backend/server.js'
  ],
  preset: '@shelf/jest-mongodb',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  modulePathIgnorePatterns: ['<rootDir>/src/']
};
