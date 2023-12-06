//=====vARS=======>
let userFormEl = document.querySelector(".form-user");
let userInputEl = document.getElementById("user");
let languagesEl = document.querySelector(".languages");
let searchTermEl = document.querySelector(".search-term");
let reposEl = document.querySelector(".repos");
//=====Event=======>
userFormEl.addEventListener('submit', formSubmitHandler);
languagesEl.addEventListener("click",handleClick)
//=====Function=======>
function handleClick(e){
    let lng = e.target.getAttribute("data-lng")
    
    if(lng){
        reposEl.innerHTML = "";
        getLangRepos(lng)
        }
}
async function getLangRepos(lng){
try {
    let res = await fetch(`https://api.github.com/search/repositories?q=${lng}`);
    let data = await res.json();
    displayRepos(data.items, lng );
    
} catch (error) {
    console.log("Error in API 2", error);
    reposEl.innerHTML += '<p class="text-center my-2 text-danger fw-bold">Please enter a valid name</p>'

    
}
}
function formSubmitHandler(e) {
    e.preventDefault();
    let user = userInputEl.value.trim();
    if (user) {
        reposEl.innerHTML=""
        getUserRepos(user);
        userInputEl.value = ""

    } else {
        Swal.fire("Please enter a valid user!");

    }
}

async function getUserRepos(user) {
    try {
        let res = await fetch(`https://api.github.com/users/${user}/repos`);
        let data = await res.json();
        displayRepos(data, user); // Pass user to displayRepos
    } catch (error) {
        console.log("Error in API 1", error);
        reposEl.innerHTML += '<p class="text-center my-2 text-danger fw-bold">Please enter a valid name</p>'

    }
}

function displayRepos(repos, userName) {
   
    

    searchTermEl.textContent = userName;

    // Iterate through repositories and display them
    repos.forEach(repo => {
        reposEl.innerHTML += `
            <a href='./repo.html?repo=${repo.owner.login}/${repo.name}' class="p-1 fw-bolder rounded-3 my-1 d-flex bg-light justify-content-between repo-item text-decoration-none">
                <span class="w-75 text-dark">${repo.owner.login}/${repo.name}</span>
                <span class="w-25 text-end">${repo.open_issues_count > 0 ? '<i class="fas text-danger fa-times"></i>' : '<i class="fas text-success fa-check-square"></i>' }</span>
            </a>
        `;
    });
    
}
