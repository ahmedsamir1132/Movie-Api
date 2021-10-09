/* Navbar Slider */

let navFlag = false;
let sideBar = $("#side-navbar").width();
let navBar = $("#side-nav-content").outerWidth();

$(".nav-open-logo").click(function () {
    if (navFlag == false) {
        $("#side-nav-content").animate({ left: 0 }, "1200", function () {
            $(".item-1").animate({ opacity: "1", paddingTop: "25px" });
            $(".item-2").animate({ opacity: "1", paddingTop: "25px" });
            $(".item-3").animate({ opacity: "1", paddingTop: "25px" });
            $(".item-4").animate({ opacity: "1", paddingTop: "25px" });
            $(".item-5").animate({ opacity: "1", paddingTop: "25px" });
            $(".item-6").animate({ opacity: "1", paddingTop: "25px" });
            $("#side-nav-content ul").css("overflow", "auto");
        })
        $("#side-navbar").animate({ left: navBar }, "1200");
        $(".nav-open-logo").html(`<i class="fas fa-times">`);
        navFlag = true;
    }
    else {
        $(".item-1").animate({ opacity: "0", paddingTop: "550px" });
        $(".item-2").animate({ opacity: "0", paddingTop: "550px" });
        $(".item-3").animate({ opacity: "0", paddingTop: "550px" });
        $(".item-4").animate({ opacity: "0", paddingTop: "550px" });
        $(".item-5").animate({ opacity: "0", paddingTop: "550px" });
        $(".item-6").animate({ opacity: "0", paddingTop: "550px" });
        $("#side-nav-content").animate({ left: -250 }, "slow");
        $("#side-navbar").animate({ left: 0 }, "slow");
        $(".nav-open-logo").html(`<i class="fas fa-align-justify"></i>`);
        navFlag = false;
    }
});

/* end of navbar */

/* Home Section */
let movies;
let imgPrefix = `https://image.tmdb.org/t/p/original/`;

async function getApi() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c5e6ab97d7382f0121791b9b7b844898&language=en-US&page=1`);
    movies = await response.json();
}

function displayMovies() {
    for (let i = 0; i < movies.results.length; i++) {
        $("#movies").append(`<div class="col-md-6 col-lg-4 my-3 mxM pxR">
        <div class="movie position-relative">
        <img src="${imgPrefix + movies.results[i].poster_path}" class="img-fluid rounded" />
            <div class="movie-info rounded d-flex flex-column align-items-center justify-content-center">
                <h2>${movies.results[i].original_title}</h2>
                <p>${movies.results[i].overview}</p>
                <p>Rate: ${movies.results[i].vote_average}</p>
                <p>${movies.results[i].release_date}</p>
            </div>
            </div>
    </div>`)
    }
}


async function showMovies() {
    await getApi();
    displayMovies();
}

showMovies();

/* End of Home */

/* Search */

async function search() {
    if ($("#w-search").val() == "") {
        $("#search").on("keyup", function () {
            let value = $(this).val().toLowerCase();
            $("#movies").empty();
            for (let i = 0; i < movies.results.length; i++) {
                if (movies.results[i].original_title.toLowerCase().includes(value)) {
                    $("#movies").append(`<div class="col-md-6 col-lg-4 my-3 mxM pxR">
                <div class="movie position-relative">
                <img src="${imgPrefix + movies.results[i].poster_path}" class="img-fluid rounded" />
                    <div class="movie-info rounded d-flex flex-column align-items-center justify-content-center">
                        <h2>${movies.results[i].original_title}</h2>
                        <p>${movies.results[i].overview}</p>
                        <p>Rate: ${movies.results[i].vote_average}</p>
                        <p>${movies.results[i].release_date}</p>
                    </div>
                    </div>
            </div>`)
                }
            }
        })
    }
    else {
        $("#search").on("keyup", function () {
            let value = $(this).val().toLowerCase();
            $("#movies").empty();
            for (let i = 0; i < search.results.length; i++) {
                if (search.results[i].original_title.toLowerCase().includes(value)) {
                    $("#movies").append(`<div class="col-md-6 col-lg-4 my-3 mxM pxR">
                <div class="movie position-relative">
                <img src="${imgPrefix + search.results[i].poster_path}" class="img-fluid rounded" />
                    <div class="movie-info rounded d-flex flex-column align-items-center justify-content-center">
                        <h2>${search.results[i].original_title}</h2>
                        <p>${search.results[i].overview}</p>
                        <p>Rate: ${search.results[i].vote_average}</p>
                        <p>${search.results[i].release_date}</p>
                    </div>
                    </div>
            </div>`)
                }
            }
        })
    }
}

document.getElementById("search").addEventListener("keyup", search);


/* End of search */

/* Search with word */

var search;

async function searchApi(movieName) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c5e6ab97d7382f0121791b9b7b844898&query=${movieName}`);
    search = await response.json();
    console.log(search)
}

async function getAllMovies() {
    if ($("#w-search").val() == "") {
        $("#movies").empty();
        showMovies();
    }
    else {
        let value = $("#w-search").val().toLowerCase();
        await searchApi(value);
        $("#movies").empty();
        for (let i = 0; i < search.results.length; i++) {
            if (search.results[i].original_title.toLowerCase().includes(value)) {
                $("#movies").append(`<div class="col-md-6 col-lg-4 my-3 mxM pxR">
        <div class="movie position-relative">
        <img src="${imgPrefix + search.results[i].poster_path}" class="img-fluid rounded" />
            <div class="movie-info rounded d-flex flex-column align-items-center justify-content-center">
                <h2>${search.results[i].original_title}</h2>
                <p>${search.results[i].overview}</p>
                <p>Rate: ${search.results[i].vote_average}</p>
                <p>${search.results[i].release_date}</p>
            </div>
            </div>
    </div>`)
            }
        }
    }
}

document.getElementById("w-search").addEventListener("keyup", getAllMovies);

/* End Search with word */

/* form validation */

let userName = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let formBtn = document.getElementById("form-submit");

let nameRejex = /^[a-z A-Z]{3,20}$/;
let emailRejex = /^[a-zA-Z0-9.+_-]{3,64}@[a-zA-Z0-9.-]{1,253}[.][a-zA-Z]{2,63}$/;
let phoneRejex = /^(01)[0-9]{9}$/;
let ageRejex = /^(?:[1-9]|[1-9][0-9]{1}|10[0-9]|110)$/;
let passwordRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function disableRemove() {
    if (nameRejex.test(userName.value) && emailRejex.test(email.value) && phoneRejex.test(phone.value) && ageRejex.test(age.value) && passwordRejex.test(password.value) && repassword.value == password.value) {
        formBtn.classList.remove("disabled");
    }
    else {
        formBtn.classList.add("disabled");
    }
}

userName.addEventListener("keyup", function () {
    if (nameRejex.test(userName.value) || userName.value == "") {
        document.getElementById("nameAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("nameAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

email.addEventListener("keyup", function () {
    if (emailRejex.test(email.value) || email.value == "") {
        document.getElementById("emailAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("emailAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

phone.addEventListener("keyup", function () {
    if (phoneRejex.test(phone.value) || phone.value == "") {
        document.getElementById("phoneAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("phoneAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

age.addEventListener("keyup", function () {
    if (ageRejex.test(age.value) || age.value == "") {
        document.getElementById("ageAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("ageAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

password.addEventListener("keyup", function () {
    if (passwordRejex.test(password.value) || password.value == "") {
        document.getElementById("passwordAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("passwordAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

repassword.addEventListener("keyup", function () {
    if (repassword.value == password.value || repassword.value == "") {
        document.getElementById("repasswordAlert").classList.add("visually-hidden");
        disableRemove();
    }
    else {
        document.getElementById("repasswordAlert").classList.remove("visually-hidden");
        disableRemove();
    }
});

/* End of form validation */