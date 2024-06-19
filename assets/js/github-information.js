function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); //use jquary to select the id and the value in that text field
    if (!username) { // if the field is empty, no value
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // template literals ` are used to add the imager loader into a div in the html. jquary finds the relevent .html
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
}