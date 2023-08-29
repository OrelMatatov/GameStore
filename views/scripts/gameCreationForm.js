const stars = document.querySelectorAll('.star');
var selectedStarRating = 0;
  
stars.forEach(star => {
    star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('game-rating'));
    selectedStarRating = rating;
    stars.forEach((s, index) => {
        if (index < rating) {
        s.src = '../imgs/star_filled.png';
        } else {
        s.src = '../imgs/star_empty.png';
        }
    });
    });
});


$(document).ready(async function(){
    const itemCountElement = document.querySelector('.item-count');
    itemCountElement.textContent = localStorage.getItem("numItemsOnCart");
    await $.get("http://localhost:8081/suppliers", function(response){
        response.forEach((supplier) => {
            var suppOption = $("<option>").val(supplier._id).text(supplier.name);
            $("#supplierSelect").append(suppOption);
        })

        var coverImg = $("<img>").attr("src", "../imgs/question-mark.png");
        $(".img-cover").append(coverImg);
    })
    .fail(function(err){
        console.log("Error: ", err);
    })
})

function isValidInput(inputText) {
    const regex = /^[A-Za-z0-9\s]+$/;
    return regex.test(inputText);
}

function priceInputValidation(inputPrice){
    const regex = /^[0-9,]+$/
    return regex.test(inputPrice);
}


$(function(){
    $('form').on('submit', function(event){
        var gameTitle = $("#title").val()
        var gamePlatform = $("#platform").val();
        var gamePrice = $("#price").val()
        var aboutTheGame = $("#about").val() 
        var gameReleaseYear = $("#releaseYear").val()
        var gameSupplier = $("#supplierSelect").val()
        event.preventDefault();

        //Check user input
        if(isValidInput(gameTitle)==false || aboutTheGame=="" || priceInputValidation(gamePrice)==false 
        || gamePlatform=="none" || gameReleaseYear=="none" || gameSupplier=="none" || selectedStarRating==0){
            alert("One of the inputs are not valid");
            return;
        }

        
        var game = {
            title: gameTitle,
            platform: gamePlatform,
            price: parseInt(gamePrice),
            about: aboutTheGame,
            rating: selectedStarRating,
            releaseYear: parseInt(gameReleaseYear),
            supplier: gameSupplier
        }
        var url = $(this).attr('action'); 
        $.post(url, game, function(response){
            alert("The game successfully created");
            //console.log("Success: ", response);
        })
        .fail(function(err){
            console.log("Error: ", err);
        })

        //Reset all the inputs
        $("#title").val("")
        $("#platform").val("")
        $("#price").val("")
        $("#about").val("")
        $("#releaseYear").val("")
        $("#supplierSelect").val("")
        const stars = document.querySelectorAll('.star');
        stars.forEach((s, index) => {
            s.src = '../imgs/star_empty.png';
        })
        });
});

function backToHomePage(){
    window.location.href = '../views/homePage.html'
}
