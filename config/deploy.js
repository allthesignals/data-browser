module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'databrowser',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
