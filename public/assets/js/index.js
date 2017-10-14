// modal
var nextPage = 1;
var defaultUrl = "";

var initialUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + getYear() + "&vote_average.gte=7&vote_average.lte=10";
// posts movie data to movie page when you click on the movie
$("body").on("click", "img", function() {
  var movieInfo = $(this);
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/" + movieInfo.data("movie-id") + "?api_key=312dfe53be027207d3159a0f85da777f&language=en-US",
    dataType: 'json',
    success: function(data) {
      var moviePacket = {
        movieTitle: data.title,
        moviePoster: "https://image.tmdb.org/t/p/w500" + data.poster_path,
        movieId: data.id,
        movieBackdrop: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
        movieOverview: data.overview,
        movieRating: data.vote_average,
        movieRelease: data.release_date,
        movieRuntime: data.runtime
      }
      $.post("/movie", moviePacket).done(function(res) {
        $("body").html(res);
      })
      console.log(data);
    }
  })
})
// registration form
$("#sign-up").on("click", function() {
  $("#modal").modal({ show: true });
})


// get horror movies using api
$("#horror").on("click", function() {
  nextPage = 1;
  if (isLoggedInUser()) {
    $(".movieBoxes").remove();
    // pages to be added in future
    // getNextPage("settingsHor");
    // getPrevPage("settingsHor");
    getMovieGenres($.cookie("settingsHor"));
  } else {
    var horrorUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&primary_release_year=" + getYear() + "&vote_average.gte=5&vote_average.lte=10&with_genres=27%2C53";
    $(".movieBoxes").remove();
    getMovies(horrorUrl);
  }
})
// get drama
$("#drama").on("click", function() {
  nextPage = 1;
  if (isLoggedInUser()) {
    $(".movieBoxes").remove();
    // pages to be added in future
    // getNextPage("settingsDra");
    // getPrevPage("settingsDra");
    getMovieGenres($.cookie("settingsDra"));
  } else {
    var dramaUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=yes&page=1&primary_release_year=" + getYear() + "&vote_average.gte=7&vote_average.lte=10&with_genres=18%2C10749";

    $(".movieBoxes").remove();
    getMovies(dramaUrl);
  }
})
// get comedy
$("#comedy").on("click", function() {
  nextPage = 1;
  if (isLoggedInUser()) {
    $(".movieBoxes").remove();
    // pages to be added in future
    // getNextPage("settingsCom");
    // getPrevPage("settingsCom");
    getMovieGenres($.cookie("settingsCom"));
  } else {
    var comedyUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=yes&page=1&primary_release_year=" + getYear() + "&vote_average.gte=5&vote_average.lte=10&with_genres=35";

    $(".movieBoxes").remove();
    getMovies(comedyUrl);
  }
})
//  get action
$("#action").on("click", function() {
  nextPage = 1;
  if (isLoggedInUser()) {
    $(".movieBoxes").remove();
    // pages to be added in future
    // getNextPage("settingsAct");
    // getPrevPage("settingsAct");
    getMovieGenres($.cookie("settingsAct"));
  } else {
    var actionUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=yes&page=1&primary_release_year=" + getYear() + "&vote_average.gte=6&vote_average.lte=10&with_genres=28"

    $(".movieBoxes").remove();
    getMovies(actionUrl);
  }

})
// drop a cookie
$("body").on("click", "#login", function(event) {
  event.preventDefault();
  var loginInfo = {
    username: $("#username").val(),
    password: $("#password").val()
  }

  $.post("/api/cookie", loginInfo).done(function(data) {
    if (data) {
      window.location = '/';
    } else {
      alert("User not found");
      $("#username").val("");
      $("#password").val("");
    }
  }).fail(function(err) {
    console.log(err);
  });

});

// logout/delete cookie
$("#logout").on("click", function() {
  $.removeCookie("user");
  location.reload('user');
})

getMovies(initialUrl);
// get movies from api
function getMovies(movieSearch) {
  $.ajax({
    url: movieSearch,
    dataType: 'json',
    success: function(data) {
      for (var i = 0; i < 12; i++) {
        $(".jumbotron").append("<div class='movieBoxes'><img data-movie-id=" + data.results[i].id + " src=" + getMoviePosters() + data.results[i].poster_path + "></div>");
      }
    }
  });

}
// get the next page of results
// function getNextPage(settingsCat) {
//   $("body").on("click", "#next-btn", function() {
//     nextPage++;
//     $(".movieBoxes").remove();
//     getPersonalizedMovies($.cookie(settingsCat), nextPage)
//   })
// }
// get previous page of results
// function getPrevPage(settingsCat) {
//   $("body").on("click", "#back-btn", function() {
//     nextPage--;
//     $(".movieBoxes").remove();
//     getPersonalizedMovies($.cookie(settingsCat), nextPage)
//   })
// }
// check if user is logged in
function isLoggedInUser() {
  if ($.cookie("user") !== undefined) {
    return true;
  } else {
    return false;
  }
}
// contructor that handles each search query
function Search(settings, pageNumber, minimumRating, movieGenres, removeGenres) {
  this.settings = settings;
  this.pageNumber = pageNumber;
  this.minimumRating = minimumRating;
  this.removeGenres = removeGenres;
  this.movieGenres = movieGenres;
  this.defaultUrl = "https://api.themoviedb.org/3/discover/movie?api_key=312dfe53be027207d3159a0f85da777f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + this.pageNumber + "&primary_release_date.gte=1990&primary_release_date.lte=2017&vote_average.gte=" + this.minimumRating + "&vote_average.lte=10&with_genres=" + this.movieGenres + this.removeGenres;
  this.searchMovies = getMovies(this.defaultUrl);
}

//  grabs one of 3 passed in settings and returns a search query criteria
function getMovieGenres(settings) {
  var movieIdActArray = [
    { fighting: "53%2C80%2C12" },
    { story: "28%2C%9648%2C80" },
    { acting: "28%2C18" }
  ];
  var movieIdComArray = [
    { slapstick: "35" },
    { dry: "35%2C18" },
    { romantic: "35%2C10749" }
  ];
  var movieIdHorArray = [
    { slice: "27" },
    { thriller: "53%2C18" },
    { mystery: "53%2C27%2C9648" }
  ];
  var movieIdDramArray = [
    { acting: "18" },
    { plot: "18%2C80" },
    { romantic: "10749%2C18" }
  ];

  switch (settings) {
    case "act-fighting":
      var newSearchQuery = new Search("act-fighting", 1, 6, movieIdActArray[0].fighting, "")
      return newSearchQuery.searchMovies;
      break;

    case "act-story":
      var newSearchQuery = new Search("act-story", 1, 6, movieIdActArray[1].story, "")
      return newSearchQuery.searchMovies;
      break;

    case "act-acting":
      var newSearchQuery = new Search("act-acting", 1, 6, movieIdActArray[2].acting, "")
      return newSearchQuery.searchMovies;
      break;

    case "com-slapstick":
      var newSearchQuery = new Search("com-slapstick", 1, 6, movieIdComArray[0].slapstick, "&without_genres=10751%2C10749%2C18%2C80")
      return newSearchQuery.searchMovies;
      break;

    case "com-dry":
      var newSearchQuery = new Search("com-dry", 1, 6, movieIdComArray[1].dry, "&without_genres=10751%2C10749")
      return newSearchQuery.searchMovies;
      break;

    case "com-romantic":
      var newSearchQuery = new Search("com-romantic", 1, 6, movieIdComArray[2].romantic, "&without_genres=10751%2C28")
      return newSearchQuery.searchMovies;
      break;

    case "dra-acting":
      var newSearchQuery = new Search("dra-acting", 1, 7, movieIdDramArray[0].acting, "&without_genres=53%2C28%2C35%2C37")
      return newSearchQuery.searchMovies;
      break;

    case "dra-plot":
      var newSearchQuery = new Search("dra-plot", 1, 7, movieIdDramArray[1].plot, "&without_genres=53%2C37")
      return newSearchQuery.searchMovies;
      break;

    case "dra-romantic":
      var newSearchQuery = new Search("dra-romantic", 1, 7, movieIdDramArray[2].romantic, "&without_genres=53%2C37%2C35")
      return newSearchQuery.searchMovies;
      break;

    case "hor-slice-dice":
      var newSearchQuery = new Search("hor-slice-dice", 1, 5, movieIdHorArray[0].slice, "&without_genres=53%2C9648%2C18%2C28%2C35%2C10749");
      return newSearchQuery.searchMovies;
      break;

    case "hor-thriller":
      var newSearchQuery = new Search("hor-thriller", 1, 7, movieIdHorArray[1].thriller)
      return newSearchQuery.searchMovies;
      break;

    case "hor-mystery":
      var newSearchQuery = new Search("hor-mystery", 1, 6, movieIdHorArray[2].mystery)
      return newSearchQuery.searchMovies;
  }
}

// make random year for initial page load
function getYear() {
  var movieYears = [];
  for (var i = 1980; i <= 2017; i++) {
    movieYears.push(i);
  }
  var rand = movieYears[Math.floor(Math.random() * movieYears.length)]
  return rand.toString();
}

function getOldYear() {
  var movieYears = [];
  for (var i = 1945; i <= 1979; i++) {
    movieYears.push(i);
  }
  var rand = movieYears[Math.floor(Math.random() * movieYears.length)]
  return rand.toString();
}
// get the url for the imgposters from tmdb
function getMoviePosters() {
  var imgUrl = "https://image.tmdb.org/t/p/w500";
  return imgUrl;
}