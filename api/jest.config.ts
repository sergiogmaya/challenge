import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Usa ts-jest como preset
  testEnvironment: 'node',  // Ambiente de ejecución de los tests
  roots: ['<rootDir>/src'],  // Directorio raíz donde buscar archivos de test
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',  // Regex para encontrar los test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Extensiones de archivo para módulos
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Usa ts-jest para transformar tsx y ts
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',  // Mapeo de alias, ajustar según configuración en tsconfig.json
  },
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'],  // Archivo de configuración inicial para tests
  collectCoverage: true,  // Habilita la recopilación de información de cobertura
  coverageDirectory: '<rootDir>/coverage',  // Directorio donde se almacenará la cobertura
  coveragePathIgnorePatterns: ['/node_modules/'],  // Ignora node_modules para la cobertura
  clearMocks: true,  // Limpia mocks automáticamente entre tests
};

export default config;
