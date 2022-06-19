/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const tsPreset = require('ts-jest/jest-preset')
const mongoPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = {
    ...tsPreset, 
    ...mongoPreset,
    testEnvironment: 'node',
    testTimeout: 15000,
    setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
}
