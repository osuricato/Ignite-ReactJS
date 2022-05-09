module.exports = {
  testPathIgnorePatterns: ['/mode_modules', '/.next'],
  // setupFilesAfterEnv: [
  //   '<rootDit>/src/tests/setupTests.ts'
  // ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  }
}