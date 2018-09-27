const Unsplash = require('unsplash-js').default
const { toJson } = require('unsplash-js')
const config = require('../config')

const unsplash = new Unsplash(config.unsplash)

/* only return photos */
const getCollectionPhotos = async (id, currentPage, perPage) => {
    try {
        let data = await unsplash.collections.getCollectionPhotos(id, currentPage, perPage)
        let photos = await toJson(photos)

        return photos
    } catch (error) {
        return error
    }
}

const listCollections = async (currentPage, perPage) => {
    try {
        let data = await unsplash.collections.listCollections(currentPage, perPage)
        let collections = await toJson(data)
        
        return collections
    } catch (error) {
        return error
    }
}

const getCollection = async (id) => {
    try {
        let data = await unsplash.collections.getCollection(id)
        let collection = toJson(data)
        
        return collection
    } catch (error) {
        return error
    }
}

module.exports = {
    getCollectionPhotos,
    listCollections,
    getCollection
}