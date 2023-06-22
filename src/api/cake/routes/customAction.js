
module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/custom',
        handler: 'cake.customAction',
        config:{
            auth: false
        }
      }
    ]
  }