// FUNCTION

function getURL() {
    const url = new URL(window.location.href);
    const pageURL = url.pathname.split('').slice(9).slice(0, -5);

    let address = ""
    pageURL.forEach(e => {
        address += e
    })
    return address;
}

function getData(url, success) {
    let dataProject = new XMLHttpRequest();

    dataProject.onreadystatechange = () => {
        if (dataProject.readyState === 4) {
            if (dataProject.status === 200) {
                success(dataProject.response);
            } else if (dataProject.status === 404) {
                alert('data not found');
            }
        }
    }

    dataProject.open('get', url);
    dataProject.send();
}

function success(result) {
    let data = JSON.parse(result)[link]
    let renderProject = []

    renderProject = renderCard(data);

    projectContainer.innerHTML = renderProject;
}

function renderCard(data) {
    return `
            <h1 class="section-title">${data.name}</h1>
            <div class="link-container">
                <a href="${data.link.github}" rel="noopener" target="_blank"><i class="fab fa-github"></i></a>
                <a href="${data.link.direct}" rel="noopener" target="_blank"><i class="fa-solid fa-link"></i></a>
            </div>
            <div class="desc-container">
                <p>${data.description}</p>
            </div>
            <h3 class="section-subtitle">Tools</h3>
            <div>
                ${renderTools(data.tools)}
            </div>
            <h3 class="section-subtitle">Gallery</h3>
            <div class="gallery-container">
                <img src="${data.thumbnail[0]}" class="jumbo">
                <div class="thumbnail">
                    ${renderThumbnails(data.thumbnail)}
                </div>
            </div>`
}

function renderThumbnails(data) {
    let thumbnail = [];
    data.forEach(e => {
        thumbnail += `<img src="${e}" class="thumb">`
    })
    return thumbnail;
}

function renderTools(data) {
    let tools = [];
    data.forEach(e => {
        tools += `<span class="tool-tag">${e}</span>`
    })
    return tools
}

function getHTMLs(htmls) {
    return document.querySelectorAll(htmls);
}

function getHTML(html) {
    return document.querySelector(html);
}

// HTML ELEMENT
const link = getURL();

const titlePage = getHTMLs(".top-title-container");

const titleImg = getHTML(".top-title-img img");

const projectContainer = getHTML(".projects");

getData('../data.json', success);


// EVENT LISTENER
window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.style.opacity = 0;
        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    }, 2000);
})

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    if (scrollY < 500) {
        titlePage[0].style.transform = `translateX(${0 - (scrollY / 15)}%)`;
        titlePage[1].style.transform = `translateX(${0 + (scrollY / 15)}%)`;
    }
})

// Gallery
setTimeout(() => {
    const container = document.querySelector('.gallery-container');
    const jumbo = document.querySelector('.jumbo');
    const thumbs = document.querySelectorAll('.thumb');

    container.addEventListener('click', function (evt) {
        if (evt.target.className == 'thumb') {
            jumbo.src = evt.target.src;
            jumbo.classList.add('fade');

            setTimeout(function () {
                jumbo.classList.remove('fade');
            }, 500);

            thumbs.forEach(function (e) {
                e.className = 'thumb';
            });

            evt.target.classList.add('active');
        }
    })
}, 500)