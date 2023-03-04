const API_KEY = 'd0c45351';
const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=d0c45351';

let moviesHtmlSrc = document.querySelector ('.movies')
let suggestedNumSrc = document.querySelector (".info--text") 
let rowMovies
let KeyWordSearch
let id = 1
let yearOfRealese 
const today = new Date()
const year = today.getFullYear();
let lightTheme = false

$("#inputYear").attr({
    "max" : year,
    "min" : 1888,
})

async function getMovies(){
    if(KeyWordSearch != undefined){
      rowMovies = await (await fetch('https://www.omdbapi.com/?apikey=3b968e7f&s='+KeyWordSearch +'&y='+yearOfRealese)).json()
       //const rowMovie = await rowMovies.json();
        let movies = rowMovies.Search
        let sorted
        if(id === 1){
            sorted = await movies
        }else{
            sorted = await movies.sort((a,b) => b.Year - a.Year)
        }
        $(".movies").removeClass("m1")
        if(rowMovies.Response == 'True'){
            moviesHtmlSrc.innerHTML = sorted.map(elem => movieHtml(elem)).join("")
            suggestedNumSrc.innerHTML = "<h2 class='info--text'>Suggested: "+ rowMovies.totalResults +"</h2>" 
        }else{
            moviesHtmlSrc.innerHTML = "<div class='no-response'>"+
            "<h3 class='no-response__text'>No results for: '"+ KeyWordSearch+"' </h3>"+
            "</div>"
            suggestedNumSrc.innerHTML = "<h2 class='info--text'>Suggested: "+ "0" +"</h2>" 
        }
    }
}

function movieHtml(movie){
        return "<div class='movies--block'>"+
        "<div class='movies-container'>"+
          "<h3 class='block--title'>"+ movie.Title +"</h3>"+
          "<div class='block--wrapper'>"+
               "<img src='"+ movie.Poster +"' class='block--wrapper__wallpaper skeleton'>"+
           "</div>"+
          "<div class='block--description'>"+
              "<div class='description--info'>"+
                  "<p class='description--info__language'> Type: "+ movie.Type +"</p>"+
                   "<p class='description--info__year'> Date: "+ movie.Year +"</p>"+
                  "<p class='description--info__Type'> ImdbId: "+ movie.imdbID +"</p>"+
           "</div>"+
            "<button class='description--play'>"+
                 "<i class='fa fa-play'></i>"+
              "</button>"+
            "</div>"+
        "</div>"+
        "</div>"
}

async function keyWord(event){
    KeyWordSearch = await event.target.value
    $("div").removeClass("invisible")
    getMovies()
}

function sortSystem(){
    $(".sort--btn").toggleClass("selected")

    if(id === 1){
        id++
    }else{
        id--
    }
    
    getMovies()

}

function displayFilter(){
    $(".nav--btns__filter").toggleClass("bold")
    $("#filter").toggleClass("filter-visible")
    $('.filter-container').toggleClass("filter-animations")
    $('.border-bottom').toggleClass('border-animations')
}

function filterByYear(event){
    yearOfRealese = event.target.value
    getMovies()
}

function clearValue(){
    let valueToClear = document.getElementById("inputYear")
    valueToClear.value = ""
    yearOfRealese = ""
    getMovies()
}

function toggleContrast(){
    if(lightTheme == false){
        lightTheme = true
        $("body").addClass("light-theme")
    }else{
        lightTheme = false
        $("body").removeClass("light-theme")
    }
}



function reloadPage(){
    location.reload()
}


$(".search__input").click(function(){
    $(".search__input").addClass("search__btn-mobile")
    $(".logo").addClass("logo-mobile")
})

$("main").click(function(){
    $(".search__input").removeClass("search__btn-mobile")
    $(".logo").removeClass("logo-mobile")
})