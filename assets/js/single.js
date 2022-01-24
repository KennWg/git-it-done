var issueContainerEl = document.querySelector("#issues-container");

// get repo issues
var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);
            });
        } else {
            alert("There was an issue with your request.");
        }
    });
};

//display repo issues
var displayIssues = function(issues){
    if(issues.length===0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    //loop over issues
    for(var i=0; i<issues.length; i++){
        //create link element to take users to issue on GitHub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create type element
        var typeEl = document.createElement("span");

        //check if issue is issue or pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("facebook/react");