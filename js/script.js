
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

// HTML ELEMENT

const titleFP = getHTMLs('.title-container');

const titleOutFP = getHTMLs('.title-out-container');

const projectTitle = getHTMLs('.project-title .section-title');

const projectCard = getHTMLs('.project-viewport');

const contactTitle = getHTMLs('.contact-title .section-title');

const contactImg = getHTML('.contact-img-title img')
// EVENT LISTENER

document.addEventListener("scroll", ()=>{
    let scrollY = window.pageYOffset;
    console.log(scrollY);

    if(scrollY < 500){
        titleFP[0].style.transform = `translateX(${-80 - (scrollY/10)}%)`;
        titleOutFP[0].style.transform = `translateX(${-80 - (scrollY / 10)}%)`;
        titleFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
        titleOutFP[1].style.transform = `translateX(${-160 + (scrollY / 10)}%)`;
    }

    if(scrollY > 500){
        rendersX(projectTitle);
    }else{
        fadesX(projectTitle);
    }

    if(scrollY > 900){
        renderY(projectCard[0],1);
        if(scrollY > 1400){
            renderY(projectCard[1],1);
            if(scrollY > 1800){
                renderY(projectCard[2],1);
                if(scrollY > 2200){
                    renderY(projectCard[3],1);
                }else{
                    fadeY(projectCard[3]);
                }
            }else{
                fadeY(projectCard[2]);
            }
        }else{
            fadeY(projectCard[1]);
        }
    }else{
        fadeY(projectCard[0]);
    }

    if (scrollY > 2700) {
        rendersY(contactTitle);
        setTimeout(() => {
            renderY(contactImg,.7);    
        }, 300);
    } else {
        fadesY(contactTitle);
        fadeY(contactImg);
    }

})