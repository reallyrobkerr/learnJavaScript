(function() {
  function createListElement(name, id) {
    var listElement = '<li class="swapi-item">';
    listElement += '<a data-id="' + id + '" class="swapi-link">' + name + '</a>';
    listElement += '<i class="fa fa-thumbs-o-up js-like" aria-hidden="true"> Like</i> ';

    // listElement += '<ul class="swapi-meta"> ';
    // listElement += '<li class="swapi-meta-item"> ';
    // listElement += 'Height: ' + height;
    // listElement += '</li>';
    // listElement += '<li class="swapi-meta-item"> ';
    // listElement += '</li> ';
    listElement += '</li>';
    return listElement;
  }

  function fillModal(info) {
    for (let i = 0; i < info.length; i++) {
      let modalStats = '<li class="swapi-stat">' + Object.keys(info) + '</li>';
      return modalStats;
    }
  }

  /*-----------------------------------------------
      DOCUMENT READY
  -----------------------------------------------*/

  $(document).ready(function() {

    //-----------------------------------------------
    //   Like
    //-----------------------------------------------

    $('.swapis').on('click', '.js-like', function(event) {
      event.preventDefault();

      // ultra newguy like/unlike toggle
      if ($(this).text() === ' Like') {
        $(this).text(' Unlike')
          .toggleClass('is-liked fa-thumbs-up fa-thumbs-o-up');
      } else {
        $(this).text(' Like')
          .toggleClass('is-liked fa-thumbs-up fa-thumbs-o-up');
      };
    });

    //-----------------------------------------------
    //   Add Link
    //-----------------------------------------------

    $('.js-add-link').on('click', function(event) {
      event.preventDefault();

      $('.js-form').toggleClass('is-visible');
    });

    // make this into search/filter later...
    $('#form-link-input').keypress(function(event) {
      if (event.which === 13) { // if enter is pressed in the form-link-input field
        event.preventDefault(); // prevent page reload
        var newEntry = $(this).val(); // store the text input in a variable
        // var author = 'Author'; // placeholder for author. I don't have a session to get a current user from yet
        $('.swapis').prepend(createListElement(newEntry));
        $('.js-form').toggleClass('is-visible'); // hide the input field again
        $('.swapi-brief').prepend('<li class="swapi-item"><a class="swapi-link" href="#">' + newEntry + '</a>'); // add just the link to the modal
        $(this).val(null); // reset the input
      };
    });

    //-----------------------------------------------
    //   Modal
    //-----------------------------------------------

    $('.js-modal-overlay').on('click', function() {
      $('.js-modal').removeClass('is-visible');
      $('.js-modal-overlay').removeClass('is-visible');
    });

    // dismiss modal when press escape
    $(document).on('keyup', function(event) {
      if (event.which === 27) {
        $('.js-modal').removeClass('is-visible');
        $('.js-modal-overlay').removeClass('is-visible');
      };
    });

    //-----------------------------------------------------------
    //   SWAPI
    //
    //   do more reading on ajax, callbacks and callback contexts
    //-----------------------------------------------------------
    const base = 'https://swapi.co/api/people/';

    $.ajax({
      url: base
    })
      .done(function(info) {
        for (let i = 0; i < info.results.length; i++) {
          $('.swapis').append(createListElement(info.results[i].name, info.results[i].url));
        }
      });

    // ✅ use <data-attributes> to create an identifier for each character
    // ✅ use URL as data-attribute in order to get more info about the correct character
    // => later, parse URL to get the /people/n endpoint for cleaner code and shove that
    //      into a variable or array
    // ✅ on click of .swapi-more, make another api call to swapi for that
    //      specific character
    // take info from `more...` click and have the modal display all available info in the JSON
    //   object (key and value)

    // a picture would be cool too (need different source for those, and more thought)

    $('.swapis').on('click', '.swapi-link', function() {
      let endpoint = $(this).data('id');

      $.ajax({ // convert to axios
        url: endpoint
      })
        .done(function(info) {
          $('.modal-media-title').html(info.name);

          $('.swapi-stats').empty().append(`
            <li>Homeworld: ${info.homeworld}</li>
            <li>Gender: ${info.gender}</li>
            <li>Species: ${info.species}</li>
            <li>Born: ${info.birth_year}</li>
            <li>Height: ${info.height}</li>
            <li>Mass: ${info.mass}</li>
            <li>Hair: ${info.hair_color}</li>
            <li>Eyes: ${info.eye_color}</li>
          `);

          $('.js-modal').addClass('is-visible');
          $('.js-modal-overlay').addClass('is-visible');
        });
    });

    // speak the 'title' on button click
    $('#speakup').on('click', () => {
      let words = $('#logo').text();
      let msg = new SpeechSynthesisUtterance();
      msg.text = words;
      speechSynthesis.speak(msg);
    });

    //pause speaking
    $(document).on('keydown', function(event) {
      if (event.which === 32 && speechSynthesis.speaking) {
        event.preventDefault();
        speechSynthesis.pause();
      };
    });

    // resumè speaking
    $(document).on('keydown', function(event) {
      if (event.which === 32 && speechSynthesis.pause) {
        event.preventDefault();
        speechSynthesis.resume();
      };
    });

    // stop speaking
    $(document).on('keydown', function(event) {
      if (event.which === 27 && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      };
    });
  });
})();
