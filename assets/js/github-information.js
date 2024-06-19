// this is the function we call when our promise is resolved
function userInformationHTML(user) { // user is the object returned from the github API
    // returning a template literal using the backspace
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) { // repos, the object returned from the github API
    if (repos.length == 0) { // if there is no repos, repos = 0
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) { // .map method, this method works like a forEach, returing an array with the results
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`; //target blank to open on a new page
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`; // .join("\n") joins everything in the array to a new line /n
}


function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); //use jquary to select the id and the value in that text field
    if (!username) { // if the field is empty, no value, this div will appear
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // template literals ` are used to add the imager loader into a div in the html. jquary finds the relevent .html
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
// when then promise. .when takes a function as it first argument. in .when, we pass in a function that is getJSON
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`), //the value we optioaned from the user box
        $.getJSON(`https://api.github.com/users/${username}/repos`) // this will list the repos for that individual user
    ).then(
        function(firstResponse, secondResponse) { // the response is what came back from the .when, the getJSON function
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData)); // response is stored in userData var and userData will be used as a argument in userInformationHTML function
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) { //if the response has a 404 status, we'll desplay the the H2 in the html
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}