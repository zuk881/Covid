// const axios = require("axios");

// axios({
//     "method":"GET",
//     "url":"https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
//     "headers":{
//     "content-type":"application/octet-stream",
//     "x-rapidapi-host":"covid-19-coronavirus-statistics.p.rapidapi.com",
//     "x-rapidapi-key":"ab9e955e11mshd24dbaf46dadbaep14c96fjsn4168308a7a25"
//     },"params":{
//     "country":"Italy"
//     }
//     })
//     .then((response)=>{
//       console.log(response.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })



var search;

$("#add-cat").on("click", function (event) {
  event.preventDefault();
  search = $("#gif-input").val().trim();
  console.log(search)
  api();
});


function api() {
  $("#api-result").empty();
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
  $.ajax(settings).done(function (response) {
    displayApi(response)
  
  });
}

function displayApi(response) {
  var result = response.data.covid19Stats

  for (var i = 0; i < result.length; i++) {

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
    $("#api-result").append(resultDiv)

  }
}

