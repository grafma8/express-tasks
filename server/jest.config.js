module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: [
    "**/test/**/*.test.ts",
    "**/test/**/*.spec.ts"
  ],
  moduleNameMapper: {
    "^entity/(.*)": "<rootDir>/domain/entity/$1"
  }
};