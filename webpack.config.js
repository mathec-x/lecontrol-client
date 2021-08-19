const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/'),
    },
  },
};
