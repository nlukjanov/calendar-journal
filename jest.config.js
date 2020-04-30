module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupTests.js'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**'
  ],
  preset: '@shelf/jest-mongodb'
};
