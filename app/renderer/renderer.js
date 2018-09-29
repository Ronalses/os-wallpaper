const unsplash = require('./unsplash')
const { perPage } = require('../config')
const wallpaper = require('./wallpaper')

/* Current page for load photos */
let currentPage = Math.floor((Math.random() * 100) + 1)
let isLoading = false

/* This is not good idea */
let currentImgSelected = null

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

/* Listen click in the photos */
document.addEventListener('click', async (event) => {
    // if the clicked element doesn't have the right selector, bail

    if (!event.path[1].matches('.photo') || isLoading) return

    event.preventDefault()

    let idPhoto = event.path[1].id
    
    if (currentImgSelected && currentImgSelected.id === idPhoto) {
        console.log('ya esta cargado')
        document.getElementById('modal').style.display = 'block'
        return
    }

    try {
        let photo = await unsplash.getPhoto(idPhoto)
        let result = await wallpaper.set(photo.urls.regular)
        alert('listo')

    } catch (error) {
        console.log(error)
        alert('Ocurrio un error :C')
    }
})

/* Create html whit the photos */
function createHtmlPhotos(photos) {
    let totalHtml = ``

    for (let photo of photos) {
        totalHtml += `
            <div class="photo" id=${photo.id}>
                <img src="${photo.urls.small}" alt="">
            </div>
        `
    }
    return totalHtml
}

function loading(state) {
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