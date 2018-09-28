const Unsplash = require('unsplash-js').default
const { toJson } = require('unsplash-js')
const config = require('../config')

const unsplash = new Unsplash(config.unsplash)

const listPhotos = async (page, perPage, orderBy) => {
    try {
        let data = await unsplash.photos.listPhotos(page, perPage, orderBy)
        let photos = await toJson(data)
        return photos
    } catch (error) {
        return error
    }
}

const search = async (keyword, page, perPage) => {
    try {
        let data = await unsplash.search.photos(keyword, page, perPage)
        let photos = await toJson(data)
        return photos
    } catch (error) {
        return error
    }
}

const getPhoto = async (id, width, height, rectangle) => {
    try {
        let data = await unsplash.photos.getPhoto(id, width, height, rectangle)
        let photo = await toJson(data)
        return photo
    } catch (error) {
        return error
    }
}

module.exports = {
    search,
    listPhotos,
    getPhoto
}