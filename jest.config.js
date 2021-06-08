module.exports = {
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|svg)$': '<rootDir>/__mocks__/imageMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
  globals: {
    Config: {}
  },
  transformIgnorePatterns: ['node_modules/(?!(@rs-ui)/)'],
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx|js)'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
