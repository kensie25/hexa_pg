module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '159.89.202.241',
      username: 'root',
      // pem: './path/to/pem'
      password: 'pampank80'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'hexa',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://159.89.202.241',
      //PORT: 3000,
      MONGO_URL: 'mongodb://mongodb:27017'
    },

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma separated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },

    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    // (optional), default is 3.4.1
    version: '3.4.1',

    servers: {
      one: {}
    }
  }
};
