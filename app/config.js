/* Process in render and main process */
let { remote } = require('electron')
const pss = remote ? remote.process : process

module.exports = {
    unsplash: {
        applicationId: pss.env.UNSPLASH_APPLICATION_ID,
        secret: pss.env.UNSPLASH_SECRET
    }
}