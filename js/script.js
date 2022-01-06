
// FUNCTiON
function getHTML(html) {
    return document.querySelector(html);
}

function getHTMLs(htmls) {
    return document.querySelectorAll(htmls);
}

function rendersX(e){
    e.forEach((el,index)=>{
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
    console.log("nyala")
}

function fadesX(e){
    e.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = `translateX(50%)`;
            el.style.opacity = 0;
        }, 300 * index);
    })
}

function fadesY(e) {
    e.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = `translateY(30vh)`;
            el.style.opacity = 0;
        }, 300 * index);
    })
}

function renderY(e,opacity){
    e.style.transform =`translateY(0)`;
    e.style.opacity = opacity;
}

function fadeY(e){
    e.style.transform = `translateY(100%)`;
}

function getDataProject(url,success){
    let dataProject = new XMLHttpRequest();

    dataProject.onreadystatechange = () => {
        if(dataProject.readyState === 4){
            if(dataProject.status === 200){
                success(dataProject.response);
            }else if(dataProject.status === 404){
                alert('data not found');
            }
        }
    }

    dataProject.open('get', url);
    dataProject.send();
}

function success(result){
    let data = JSON.parse(result);

    renderData = data.slice(0, 4);
    linkData = data[4];
    
    renderData.forEach((e,i)=>{
        if(i % 2 === 0){
            render = renderCard(e, i, "");
            projectContainer.innerHTML += render;
        }else{
            render = renderCard(e, i, "right");  
            projectContainer.innerHTML += render;
        }
    })

    projectContainer.innerHTML += renderLink(linkData);

}

function renderCard(data,index,right){
    return `<div class="project-card ${right}">
                <div class="project-viewport">
                    <div class="project-desc">
                        <span class="project-desc-year">${data.year}</span>
                        <a href="${data.link}" class="project-desc-link" >See Details <i class="fas fa-long-arrow-alt-right arrow"></i></a>
                    </div>
                    <img src="${data.thumbnail}" alt="Thumbnail picture of ${data.name}" >
                    <div class="project-info">
                        <span class="project-num">0${index +1}.</span>
                        <h1 class="project-name">${data.name}</h1>
                        <h2 class="project-tool">${data.tool}</h2>
                    </div>
                </div>
            </div>`
}

function renderLink(data){
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
document.addEventListener("scroll",()=>{
    let scrollY = window.pageYOffset;

    const projectTitle = getHTMLs('.project-title .section-title');
    const projectCard = getHTMLs('.project-viewport');

    if(scrollY < 500){
        titleFP[0].style.transform = `translateX(${-80 - (scrollY/10)}%)`;
        titleOutFP[0].style.transform = `translateX(${-80 - (scrollY / 10)}%)`;
        titleFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
        titleOutFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
    }

    if(scrollY > 500){
        rendersX(projectTitle);
        aboutBtn.style.opacity = 0;
    }else{
        fadesX(projectTitle);
        aboutBtn.style.opacity = 1;
    }

    if(window.screen.width > 1023){
        if (scrollY > 500) {
            rendersX(projectTitle);
            aboutBtn.style.opacity = 0;
        } else {
            fadesX(projectTitle);
            aboutBtn.style.opacity = 1;
        }

        if (scrollY > 900) {
            renderY(projectCard[0], 1);
            if (scrollY > 1400) {
                renderY(projectCard[1], 1);
                if (scrollY > 1800) {
                    renderY(projectCard[2], 1);
                    if (scrollY > 2300) {
                        renderY(projectCard[3], 1);
                    } else {
                        fadeY(projectCard[3]);
                    }
                } else {
                    fadeY(projectCard[2]);
                }
            } else {
                fadeY(projectCard[1]);
            }
        } else {
            fadeY(projectCard[0]);
        }

        if (scrollY > 2900) {
            rendersY(contactTitle);
            setTimeout(() => {
                renderY(contactImg, .7);
            }, 300);
        } else {
            fadesY(contactTitle);
            fadeY(contactImg);
        }

    }else{
        if (scrollY > 300) {
            rendersX(projectTitle);
            aboutBtn.style.opacity = 0;
        } else {
            fadesX(projectTitle);
            aboutBtn.style.opacity = 1;
        }

        if (scrollY > 400) {
            renderY(projectCard[0], 1);
            if (scrollY > 1000) {
                renderY(projectCard[1], 1);
                if (scrollY > 1400) {
                    renderY(projectCard[2], 1);
                    if (scrollY > 1800) {
                        renderY(projectCard[3], 1);
                    } else {
                        fadeY(projectCard[3]);
                    }
                } else {
                    fadeY(projectCard[2]);
                }
            } else {
                fadeY(projectCard[1]);
            }
        } else {
            fadeY(projectCard[0]);
        }

        if (scrollY > 2400) {
            rendersY(contactTitle);
            setTimeout(() => {
                renderY(contactImg, .7);
            }, 300);
        } else {
            fadesY(contactTitle);
            fadeY(contactImg);
        }
    }
})

window.addEventListener("load", ()=>{
    setTimeout(() => {
        preloader.style.opacity = 0;
        setTimeout(() => {
            preloader.style.display = "none";        
        }, 700);  
    }, 2000);
})

if (window.screen.width > 1023){
    projectViewport.addEventListener("click",()=>{
        projectDesc.style.opacity = 1;
    })
}