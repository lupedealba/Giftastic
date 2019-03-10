  $(document).ready(function () {


///////Array of topics//////////
var topics = [
    'cat',
    'dog',
    'ferret',
    'mouse',
    'giraffe',
    'simba',
    'hippo',
    'tiger',
    'liger',
    'lion',
];

function displayGifs() {
  var animals = $(this).attr('data-animals');

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jBXXCD6spq9WJ2i23Shg4za3tmswqCX2&q=" +
        animals + "&limit=10&offset=0&rating=PG&lang=en";
        $.ajax({
          url: queryURL,
          method: "GET"
          })
         .then(function (response) {
          var results = response.data;
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var newDiv = $('<div class="allgifs">');
            var newRating = $('<h3>').html('Rating: ' + results[i].rating);
            var newImg = $('<img>');
              newImg.attr('src', results[i].images.fixed_height_still.url);
              newImg.attr('data-still', results[i].images.fixed_height_still.url);
              newImg.attr('data-animate', results[i].images.fixed_height.url);
              newImg.attr('data-state', 'still');
              newImg.addClass('gif');
              newDiv.append(newRating);
              newDiv.append(newImg);
          $('#gifContainer').append(newDiv);
          }

      $('.gif').on('click', function () {
        event.preventDefault();
        var state = $(this).attr('data-state');

        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
      } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
      }
  });
});
}
// Function for displaying movie data
function renderButtons() {

  // Delete buttons prior to adding new movies
  $('#animalsGroup').empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

      // Dynamically generate buttons for each movie in array
      var button = $('<button>');

      // Adding a class of movies to buttons
      button.addClass('animals');

      // Adding a data-attribute
      button.attr('data-animals', topics[i]);

      // Providing the initial button text
      button.text(topics[i]);

      // Adding the button to the moviesGroup div
      $('#animalsGroup').append(button);
  }
}

// Function for when events button is clicked
$(' #addAnimalsButton').on("click", function (event) {
  event.preventDefault();

  // Alert textbox cannot be blank
  if ($('#newAnimalsInput').val().trim().toLowerCase() == '') {
      window.alert('Please enter an animal name. Textbox cannot be left blank.');
  } else {

      // Grabs input from textbox
      var animals = $('#newAnimalsInput').val().trim();

      // Add item to topics array
      topics.push(animals);

      // Call renderButtons to handle processing of topics array
      renderButtons();
  }
});

// On click movies button and run displayGifs function 
$(document).on("click", ".animals", displayGifs);

// Display all buttons on load
renderButtons();

  








});