$(document).ready(async function(){
    await $.get("http://localhost:8081/suppliers", function(response){
        response.forEach((supplier) => {
            var suppOption = $("<option>").val(supplier._id).text(supplier.name);
            $("#supplierSelect").append(suppOption);
        })
    })
    .fail(function(err){
        console.log("Error: ", err);
    })

    await $.get("http://localhost:8081/games/game/"+localStorage.getItem('editedGameId'), function(game){
        $("#title").val(game.title)
        $("#platform").val(game.platform);
        $("#price").val(game.price)
        $("#about").val(game.about) 
        $("#releaseYear").val(game.releaseYear)
        $("#supplierSelect").val(game.supplier)
        selectedStarRating = parseInt(game.rating)
        const stars = document.querySelectorAll('.star');
        stars.forEach((s, index) => {
            if (index < game.rating) {
            s.src = '../imgs/star_filled.png';
            } else {
            s.src = '../imgs/star_empty.png';
            }
        });
        var title = game.title.replace(/\s+/g, '').toLowerCase();
        var coverImg = $("<img>").attr("src", "../imgs/"+title+".png");
        $(".img-cover").append(coverImg);

        $("#delete-btn").click(function() {
            $("#popup").show();
          });
        
          $("#btn-yes").click(async function() {
            await $.ajax({
                url: "http://localhost:8081/games/game/"+localStorage.getItem('editedGameId'),
                type: "DELETE",
                success: function(response){
                    alert("Game deleted successfully")
                    backToHomePage();
                }
            })
          });
        
          $("#btn-no").click(function() {
            $("#popup").hide();
          });
    })
})


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

        $.ajax({
            url:$(this).attr('action')+localStorage.getItem('editedGameId'),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(game),
        }).done(function(){
            alert("The game successfully updated");
            backToHomePage()
        }).fail(function(err){
            console.log("Error: ", err);
        })
        
        });
});

function backToHomePage(){
    window.location.href = '../views/homePage.html'
}
