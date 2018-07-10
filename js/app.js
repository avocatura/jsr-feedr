/*
  Please add all Javascript code to this file.
*/

//Change API depending on which source in the drop down is clicked
$(".source").click(function () {
	$("#clickSource").html($(this).html());
	$("body").toggleClass("loader")
	if ($(this).html() === "The New York Times") {
		callAPI(urlNYT);
	} else if ($(this).html() === "The Guardian") {
		callAPI(urlGuardian);
	} else {
		callAPI(urlUSA);
	}
});

//Change API to defualt gaurdian Api when feedr is clicked
$("#feedrButton").click(function() {
	$("body").toggleClass("loader")
	callAPI(urlGuardian);
	$("#clickSource").html("The Guardian");
})

//Each API url
var urlNYT = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3afb4f16370345f492b3cf42d953d992"
var urlGuardian = "https://content.guardianapis.com/search?api-key=ba11c48c-0660-411d-bcfe-d0c745d9741c&show-fields=,wordcount,thumbnail&show-blocks=body:latest";
var urlUSA = "https://newsapi.org/v2/top-headlines?country=us&apikey=d33e428ac382467388b79f0bb4855ea4"

//variables for DOM elements
var articles = $(".article");
var articleContent = $(".articleContent");
var featuredImage = $(".featuredImage");
var impressions = $(".impressions");

//Get data from API and replace DOM elements with data
var callAPI = function(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.send();
	request.onload = function() {
	var x = JSON.parse(request.response);
	//Promise function to toggle body loader class when the API has loaded
	var promiseApi = new Promise(function(resolve, reject) {
	if (request.status === 200) {
		resolve($("body").toggleClass("loader"));
		console.log("Success");
	}
	else {
		reject(alert("Sorry, this page failed to load."));
		console.log("failure");
	};
	});

	//Add API data to DOM
	for (let i = 0; i < articles.length; i++) {
	//define DOM variables depending on API
	if (url === urlGuardian) {
		var webTitle = x.response.results[i].webTitle;
		var sectionName = x.response.results[i].sectionName;
		var thumbnail = x.response.results[i].fields.thumbnail
		var impressionsValue = x.response.results[i].fields.wordcount;
	} else if (url === urlUSA) {
		var webTitle = x.articles[i].title;
		var sectionName = x.articles[i].source.name;
		var thumbnail = x.articles[i].urlToImage;
		var impressionsValue = x.articles[i].publishedAt.substring(5,10);
	} else {
		var webTitle = x.results[i].title;
		var sectionName = x.results[i].section;
		var thumbnail = x.results[i].multimedia[0].url;
		var impressionsValue = x.results[i].updated_date.substring(5,10);
	}
	//Select DOM elements and replace with API variables
	var articleTitle = $(articleContent[i]).find("h3")[0]; 
	articleTitle.innerHTML = webTitle;	
	var articleSubHeading = $(articleContent[i]).find("h6")[0];
	articleSubHeading.innerHTML = sectionName;
	var img = $(featuredImage[i]).find("img")[0];
	$(img).attr("src", thumbnail);
	var wordcount = $(impressions[i]);
	wordcount.html(impressionsValue);
	}
	
	//Toggle popUp hidden class when a headline is clicked and fill in popUp DOM elements
	//with that indexed API data
	$("h3").click(function () {
		var index = $("h3").index(this);
		$("#popUp").toggleClass("hidden");
		$("#popUpTitle").html($(this).html());
		console.log(url);
		if ($("#clickSource").html() === "The Guardian") {
			var webUrl = x.response.results[index].webUrl;
			var description = x.response.results[index].blocks.requestedBodyBlocks["body:latest"][0].bodyTextSummary.substring(0,800);
		} else if ($("#clickSource").html() === "USA Today") {
			var webUrl = x.articles[index].url;
			var description = x.articles[index].description; 
		} else if ($("#clickSource").html() === "The New York Times"){
			var webUrl = x.results[index].url;
			var description = x.results[index].abstract;
		}
		$("#popUp").find('p').html(description);
		$(".popUpAction").click(function () {
			$(this).attr("href", webUrl);
		})
		})
	};
};

callAPI(urlGuardian);

//Close popUp when the X is clicked
$(".closePopUp").click(function () {
	$("#popUp").toggleClass("hidden");
})
//Expand search box when search icon is cicked
$("#searchIcon").click(function() {
	$("#search").toggleClass("active");
	$("#dropDown").toggleClass("hidden");
})
//Collapse search box when enter key is pressed within Input Box
$("#textbox").keyup(function(event){
	if (event.keyCode === 13) {
		$("#searchIcon").click();
	}
});



