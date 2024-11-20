import globals from 'globals';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  { files: ['**/*.js'] },
  { languageOptions: { globals: { ...globals.nodeBuiltin } } },
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'no-unused-vars': 'warn',
      'import/no-commonjs': 'warn'
    }
  },
  { ignores: ['jsonimport.js'] }
];
