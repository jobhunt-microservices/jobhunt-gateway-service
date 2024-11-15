module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  rules: {
    'no-multiple-empty-lines': [2, { max: 2 }],
    semi: [2, 'always'],
    curly: ['warn'],
    'prefer-template': ['warn'],
    'space-before-function-paren': [0, { anonymous: 'always', named: 'always' }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    camelcase: 0,
    'no-return-assign': 0,
    quotes: ['error', 'single'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 0,
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type', 'object'],
        'newlines-between': 'always'
      }
    ]
  },
  ignorePatterns: ['Dockerfile*', '.dockerignore', '.npmrc', 'Jenkinsfile']
};
