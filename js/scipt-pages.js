// FUNCTION

function getURL() {
    const url = new URL(window.location.href);
    const pageURL = url.pathname.split('').slice(9).slice(0,-5);

    let address = ""
    pageURL.forEach( e =>{
        address += e
    })
    return address;
}

function getData(url,success,num){
    let dataProject = new XMLHttpRequest();

    if(num === undefined){
        dataProject.onreadystatechange = () => {
            if(dataProject.readyState === 4){
                if(dataProject.status === 200){
                    success(dataProject.response);
                }else if(dataProject.status === 404){
                    alert('data not found');
                }
            }
        }    
    }else{
        dataProject.onreadystatechange = () => {
            if (dataProject.readyState === 4) {
                if (dataProject.status === 200) {
                    success(dataProject.response,num);
                } else if (dataProject.status === 404) {
                    alert('data not found');
                }
            }
        }   
    }
    

    dataProject.open('get',url);
    dataProject.send();
}

function success(result,num){
    let data = JSON.parse(result)[link]
    let renderProject = []

    if(num === undefined){
        data.forEach((e,i)=>{
            renderProject = render(e,i);
            projectContainer.innerHTML += renderProject;
        })    
    }else{
        renderProject = renderDetail(data[num]);
        setTimeout(() => {
            detailProject.style.opacity = 1;
        }, 100);
        detailProject.style.display = 'flex';   
        detailProject.innerHTML = renderProject;
    }
}


function render(data,i) {
    return `<div class="project" data-project=${i}>
        <img class="project-thumbnail" src="${data.thumbnail}" alt="">
    </div>`
}

function renderDetail(data){
    if(data.name === undefined){
        return `<button class="close-btn">close</button>
            <h1>PROJECT NOT EXIST</h1>
        `
    }else{
        return `<button class="close-btn">close</button>
            <div class="detail-container">
                <div class="image"></div>
                <div class="image"></div>
                <div class="image"></div>
                <div class="image"></div>
                <div class="image"></div>
            </div>
            <div class="detail-desc">
                <h1>${data.name}</h1>
                <h2>tools</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, esse itaque labore ratione quisquam minima nam eius est qui facere officia eos vitae fuga necessitatibus. Aliquid autem consequatur nesciunt sapiente temporibus. Beatae, repudiandae numquam animi impedit vel est magnam dolorum cum, quo, suscipit enim perferendis! Quia, eius. Iusto, nesciunt assumenda.</p>
                <a href="">Github</a>
                <a href="">Project</a>
            </div>`    
    }
    
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

const projectContainer = getHTML(".project-container");

const detailProject = getHTML(".detail-project");

getData('../data.json',success);


// EVENT LISTENER
window.addEventListener('click',(e)=>{
    if(e.target.className === 'close-btn'){
        setTimeout(() => {
            detailProject.style.display = 'none';
        }, 500);
        detailProject.style.opacity = 0;
    }
})

window.addEventListener("load",()=>{
    const projects = getHTMLs(".project");

    projects.forEach((project)=>{
        project.addEventListener('click',(e)=>{
            let projectNum = e.target.dataset.project
            if(projectNum === undefined){
                console.log(projectNum)
            }else{
                getData('../data.json', success, projectNum);    
                console.log(projectNum)
            }
           
        })
    })
})

window.addEventListener("scroll",()=>{
    let scrollY = window.pageYOffset;

    if (scrollY < 500) {
        titlePage[0].style.transform = `translateX(${0 - (scrollY / 15)}%)`;
        titlePage[1].style.transform = `translateX(${0 + (scrollY / 15)}%)`;    
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