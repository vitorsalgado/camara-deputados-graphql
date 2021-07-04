'use strict'

module.exports = {
  verbose: true,
  collectCoverage: false,
  restoreMocks: true,
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'node',
  rootDir: __dirname,
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  },
  reporters: ['default'],
  watchPathIgnorePatterns: ['coverage'],
  projects: ['<rootDir>'],
  collectCoverageFrom: [
    '**/src/*/**/*.ts',
    '**/src/*/**/*.tsx',
    '!**/bin/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/build/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!scripts/*'
  ],
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
  modulePathIgnorePatterns: ['dist', 'tools/*', 'examples/*', 'scripts/*'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/scripts/'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1'
  }
}
