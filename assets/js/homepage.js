var userFormEl = document.querySelector("#user-form"),
    nameInputEl = document.querySelector("#username"),
    repoContainerEl = document.querySelector("#repos-container"),
    repoSearchTerm = document.querySelector("#repo-search-term");

/* form submit handler */
var formSubmitHandler = function(event){
    event.preventDefault();
    
    // get value from input
    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else{
        alert("Please enter a GitHub username")
    }
};

/* Function to get repo data */
var getUserRepos = function(user){
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        //if response successful
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else{
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};

// function for displaying repos
var displayRepos = function(repos, searchTerm){
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //check if api returned any repos
    if(repos.length===0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    //loop over repos
    for (var i=0; i< repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create containers for repos
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href","./single-repo.html?repo=" + repoName);

        //create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append status to container
        repoEl.appendChild(statusEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
}

/* event listener for form */
userFormEl.addEventListener("submit", formSubmitHandler);
