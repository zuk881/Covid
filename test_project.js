
$(document).ready(function () {

  // array to hold data values, button text, and search parameters
  var giphy = ["US", "Italy", "Canada", "Germany"];

  // function to loop through the array and display buttons
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < giphy.length; i++) {
      var a = $("<button>");
      a.addClass("gif-button");
      a.attr("data-name", giphy[i]);
      a.text(giphy[i]);
      $("#buttons-view").append(a);
    }
  }

  // global variable to hold search 
  var search;

  // add a country in form function
  $("#add-cat").on("click", function (event) {
    event.preventDefault();
    search = $("#gif-input").val().trim();
    giphy.push(search);
    renderButtons();
  });

  // function to perform the function call
  function api() {

    // erase previous search results before diplaying new results  
    $("#api-result").empty();

    // variable to hold the data of button pushed that is then added to search
    search = $(this).attr("data-name");

    // variable to hold search parameters and API key
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" + search,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "ab9e955e11mshd24dbaf46dadbaep14c96fjsn4168308a7a25"
      }
    }

    // ajax call to API
    $.ajax(settings).done(function (response) {
      displayApi(response)

    });
  }

  // function to display results from API to html after response
  function displayApi(response) {

    // set variable to shorten result string
    var result = response.data.covid19Stats

    // loop through results
    for (var i = 0; i < result.length; i++) {

      // set variables to results and append them to html
      var resultDiv = $("<div>");
      var resultProvince = result[i].province;
      var resultConfirmed = result[i].confirmed;
      var resultDied = result[i].deaths;
      var resultRecovered = result[i].recovered;
      resultDiv.append("<br>" + "Province: " + resultProvince + "<br>");
      resultDiv.append("Confirmed: " + resultConfirmed + "<br>");
      resultDiv.append("Died: " + resultDied + "<br>");
      resultDiv.append("Recovered: " + resultRecovered + "<br>");
      resultDiv.addClass("col-sm-2");
      resultDiv.addClass("res-card");
      $("#api-result").append(resultDiv)
    }
  }

  // button event listener to display 10 gifs 
  $(document).on("click", ".gif-button", api);

  // function call to display buttons
  renderButtons();

});