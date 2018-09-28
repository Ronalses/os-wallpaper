const unsplash = require('./unsplash')
const { perPage } = require('../config')

/* Current page for load photos */
let currentPage = Math.floor((Math.random() * 100) + 1)
let isLoading = false

/* Load photos */
async function loadPhotos() {
    loading(true)
    try {
        let photos = await unsplash.listPhotos(currentPage, perPage)
        console.log(photos)
        /* Set photos in html */
        document.getElementById('photos-container').innerHTML += createHtmlPhotos(photos)

        loading(false)
    } catch (error) {
        loading(false)
        console.log(error)
    }
}

/* Create html whit the photos */
function createHtmlPhotos(photos) {
    let totalHtml = ``

    for (let photo of photos) {
        totalHtml += `
            <div class="photo">
                <img src="${photo.urls.small}" alt="">
            </div>
        `
    }
    return totalHtml
}

function loading(state){
    isLoading = state
}

loadPhotos()
window.addEventListener("scroll", () => {
    let scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    
    if (scrollpercent === 1) {
        if (!isLoading) {
            currentPage++
            loadPhotos()
        }
    }
})