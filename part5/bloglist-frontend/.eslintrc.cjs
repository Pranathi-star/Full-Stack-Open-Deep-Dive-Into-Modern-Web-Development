module.exports = {
    root: true,
    env: {
      "cypress/globals": true
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    settings: { react: { version: '18.2' } },
    plugins: ['react', 'jest', 'cypress']
  }