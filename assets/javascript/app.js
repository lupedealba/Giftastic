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

function renderButtons() {
  $('#animalsGroup').empty();
  for (var i = 0; i < topics.length; i++) {
      var button = $('<button>');
      button.addClass('animals');
      button.attr('data-animals', topics[i]);
      button.text(topics[i]);
      $('#animalsGroup').append(button);
  }
}

$(' #addAnimalsButton').on("click", function (event) {
  event.preventDefault();

  if ($('#newAnimalsInput').val().trim().toLowerCase() == '') {
      window.alert('Please enter an animal name. Textbox cannot be left blank.');
  } else {

      var animals = $('#newAnimalsInput').val().trim();
      topics.push(animals);
      renderButtons();
  }
});

$(document).on("click", ".animals", displayGifs);
renderButtons();

  








});