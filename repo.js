let reposEl = document.querySelector(".repos");
let issueName = document.querySelector(".issueName")
function getRepoName(){
    let qurStr = document.location.search;
    let repoName = qurStr.split("=")[1]
    if(repoName){
        getIssues(repoName)
    }else{

    }
}
getRepoName()
async function getIssues(repoName){
    try {
        let res = await fetch(`https://api.github.com/repos/${repoName}/issues`);
        let data = await res.json();
        displayRepos(data,repoName);
        
    } catch (error) {
        console.log("Error in API 3", error);
    
    }}
  function  displayRepos(issues,repoName){
      issueName.innerHTML +=`Showing Issues for : ${repoName}`
    if(issues.length == 0){
        reposEl.innerHTML += '<p class="text-center my-2 text-danger fw-bold">No Issues</p>'

    }else{
        
    
    issues.forEach(issue => {
        reposEl.innerHTML += `
            <a href=${issue.html_url} target="_blank" class="p-1   fw-bolder rounded-3 w-100 my-1 d-flex bg-light justify-content-between repo-item text-decoration-none">
                <span class=" w-100 text-dark">${issue.title}</span>
            </a>
        `;
    });  }
}