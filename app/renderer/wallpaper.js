const request = require('request')
const fs = require('fs')
const wallpaper = require('../wallpaper')

const set = async (url, id, scale) => {
    try {
        let imgName = await descargarImg(url, 'currentPhoto')
        let result = await wallpaper.set(imgName, { scale: 'fit' })
        return result
    } catch (error) {
        return err
    }
}


function descargarImg(url, finalName) {
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
            if (err) reject(err)

            let imgExt = res.headers['content-type'].split('/')[1]
            let imgName = `${finalName}.${imgExt}`
            request(url).pipe(fs.createWriteStream(imgName)).on('close', () => {
                resolve(imgName)
            })
        })
    })
}

module.exports = {
    set
}