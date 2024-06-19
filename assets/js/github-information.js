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
        $.getJSON(`https://api.github.com/users/${username}`) //the value we optioaned from the user box
    ).then(
        function(response) { // the response is what came back from the .when, the getJSON function
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData)); // response is stored in userData var and userData will be used as a argument in userInformationHTML function
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