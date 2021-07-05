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
  collectCoverageFrom: ['**/src/*/**/*.ts', '!**/__mocks__/**', '!**/__tests__/**', '!**/dist/**', '!scripts/*'],
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
  modulePathIgnorePatterns: ['dist', 'scripts/*'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/scripts/'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1'
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
}
