// FUNCTiON
function getHTML(html) {
    return document.querySelector(html);
}

function getHTMLs(htmls) {
    return document.querySelectorAll(htmls);
}

function rendersX(e) {
    e.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = `translateX(0)`;
            el.style.opacity = 1;
        }, 300 * index);
    })
}

function rendersY(e) {
    e.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = `translateY(0)`;
            el.style.opacity = 1;
        }, 300 * index);
    })
}

function renderY(e) {
    e.style.transform = `translateY(0)`;
    e.style.opacity = 1;
}

function getDataProject(url, success) {
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
    let data = JSON.parse(result).project;

    renderData = data.slice(0, 4);
    linkData = data[4];

    renderData.forEach((e, i) => {
        if (i % 2 === 0) {
            render = renderCard(e, i, "");
            projectContainer.innerHTML += render;
        } else {
            render = renderCard(e, i, "right");
            projectContainer.innerHTML += render;
        }
    })

    projectContainer.innerHTML += renderLink(linkData);

}

function renderCard(data, index, right) {
    return `<div class="project-card ${right}">
                <div class="project-viewport">
                    <div class="project-desc">
                        <a href="${data.link}" class="project-desc-link" >See Details <i class="fas fa-long-arrow-alt-right arrow"></i></a>
                    </div>
                    <img src="${data.thumbnail}" alt="Thumbnail picture of ${data.name}" >
                    <div class="project-info">
                        <span class="project-num">0${index + 1}.</span>
                        <h1 class="project-name">${data.name}</h1>
                        <h2 class="project-year">${data.year}</h2>
                    </div>
                </div>
            </div>`
}

function renderLink(data) {
    return `<a class="project-btn" href="${data.link}">See My ${data.name} <i class="fas fa-long-arrow-alt-right arrow"></i></a>`
}

// HTML ELEMENT
const titleFP = getHTMLs('.title-container');

const titleOutFP = getHTMLs('.title-out-container');

const contactTitle = getHTMLs('.contact-title .section-title');

const contactImg = getHTML('.contact-img-title img');

const aboutBtn = getHTML('.about-btn');

const projectContainer = getHTML('.project');

const projectViewport = getHTML('.project-viewport');

const projectDesc = getHTML('.project-desc');

const preloader = getHTML('#preloader');

getDataProject('./data.json', success);

// EVENT LISTENER
document.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    const projectTitle = getHTMLs('.project-title .section-title');
    const projectCard = getHTMLs('.project-viewport');

    if (scrollY < 500) {
        titleFP[0].style.transform = `translateX(${-160 - (scrollY / 10)}%)`;
        titleOutFP[0].style.transform = `translateX(${-160 - (scrollY / 10)}%)`;
        titleFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
        titleOutFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
    }


    if (window.screen.width > 2300) { // computer wide screen
        if (scrollY > 800) {
            rendersX(projectTitle);
        }

        if (scrollY > 1200) {
            renderY(projectCard[0]);
            if (scrollY > 1700) {
                renderY(projectCard[1]);
                if (scrollY > 2200) {
                    renderY(projectCard[2]);
                    if (scrollY > 2700) {
                        renderY(projectCard[3]);
                    }
                }
            }
        }

        if (scrollY > 3200) {
            rendersY(contactTitle);
            setTimeout(() => {
                renderY(contactImg, .7);
            }, 300);
        }

    } else if (window.screen.width > 1023 && window.screen.width < 2300){ // computer small screen
        if (scrollY > 500) {
            rendersX(projectTitle);
        }

        if (scrollY > 900) {
            renderY(projectCard[0]);
            if (scrollY > 1400) {
                renderY(projectCard[1]);
                if (scrollY > 1900) {
                    renderY(projectCard[2]);
                    if (scrollY > 2400) {
                        renderY(projectCard[3]);
                    }
                }
            }
        }

        if (scrollY > 2900) {
            rendersY(contactTitle);
            setTimeout(() => {
                renderY(contactImg, .7);
            }, 300);
        }
        
    }else { // mobile
        if (scrollY > 300) {
            rendersX(projectTitle);
        }

        if (scrollY > 400) {
            renderY(projectCard[0]);
            if (scrollY > 1000) {
                renderY(projectCard[1]);
                if (scrollY > 1400) {
                    renderY(projectCard[2]);
                    if (scrollY > 1800) {
                        renderY(projectCard[3]);
                    }
                }
            }
        }

        if (scrollY > 2400) {
            rendersY(contactTitle);
            setTimeout(() => {
                renderY(contactImg, .7);
            }, 300);
        }
    }
})

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.style.opacity = 0;
        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    }, 2000);
})

if (window.screen.width < 1023) {
    projectViewport.addEventListener("click", () => {
        projectDesc.style.opacity = 1;
    })
}