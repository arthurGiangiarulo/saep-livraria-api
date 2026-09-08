/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  // reflect-metadata precisa carregar antes das entities (decorators do TypeORM)
  setupFiles: ['reflect-metadata'],
};
