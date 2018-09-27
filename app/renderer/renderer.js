const unsplash = require('./unsplash')

unsplash.listCollections()
    .then(console.log)
    .catch(console.log)
