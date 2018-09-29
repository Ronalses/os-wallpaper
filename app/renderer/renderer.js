const unsplash = require('./unsplash')
const { perPage } = require('../config')
const wallpaper = require('./wallpaper')

/* Current page for load photos */
let currentPage = Math.floor((Math.random() * 100) + 1)
let isLoading = false

/* when search */
let totalPhotos = 0
let totalPages = 0
let keyword = ''

/* Load photos */
async function loadPhotos(currentPage, perPage, keyword = '') {
    loading(true)
    try {
        let photos = []
        if (keyword && keyword !== '') {
            data = await unsplash.search(keyword, currentPage, perPage)
            totalPages = data.total_pages
            totalPhotos = data.total
            photos = data.results
        } else {
            photos = await unsplash.listPhotos(currentPage, perPage)
        }

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
    loading(true)
    try {
        let photo = await unsplash.getPhoto(idPhoto)
        let result = await wallpaper.set(photo.urls.regular)
        loading(false)
    } catch (error) {
        loading(false)
        console.log(error)
        alert('Ocurrio un error :C')
    }
})

document.getElementById('search').addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value !== '') {
        keyword = document.getElementById('search').value
        document.getElementById('photos-container').innerHTML = ''
        currentPage = 1
        loadPhotos(currentPage, perPage, keyword)
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
    if (state) {
        document.getElementById('container-loading').style.visibility = 'visible'
    }
    else {
        document.getElementById('container-loading').style.visibility = 'hidden'
    }
}

loadPhotos(currentPage, perPage)
window.addEventListener("scroll", () => {
    let scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)


    if (scrollpercent === 1) {
        if (!isLoading) {
            if (keyword !== '') {
                if (currentPage <= totalPages) {
                    currentPage++
                    loadPhotos(currentPage, perPage, keyword)
                }
            } else {
                currentPage++
                loadPhotos(currentPage, perPage, keyword)
            }
        }
    }
})