(function() {
  function createListElement(name, height, id) {
    var listElement = '<li class="swapi-item">';
    listElement += '<a data-id="' + id + '" class="swapi-link">' + name + '</a>';
    listElement += '<i class="fa fa-thumbs-o-up js-like" aria-hidden="true"> Like</i> ';
    listElement += '<ul class="swapi-meta"> ';

    // listElement += '<li class="swapi-meta-item"> ';
    // listElement += 'Height: ' + height;
    // listElement += '</li>';

    listElement += '<li class="swapi-meta-item"> ';
    listElement += '</li> ';
    listElement += '</li>';
    return listElement;
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

      // ultra basic-bitch-newfag like/unlike toggle
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

    // make this into search later...
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
    const base = 'http://swapi.co/api/people/';

    $.ajax({
      url: base
    })
      .done(function(info) {
        for (let i = 0; i < info.results.length; i++) {
          $('.swapis').append(createListElement(info.results[i].name ,info.results[i].height, info.results[i].url));
        }
      });

    // ✅ use <data-attributes> to create an identifier for each character
    // ✅ use URL as data-attribute in order to get more info about the correct character
    // => later, parse URL to get the /people/n endpoint for cleaner code and shove that
    //      into a variable
    // ✅ on click of .swapi-more, make another api call to swapi for that
    //      specific character

    // from here I want to have the modal display all available info returned in the JSON
    //   object (key and value)

    // a picture would be cool too (need different source for those)

    $('.swapis').on('click', '.swapi-link', function() {
      let endpoint = $(this).data('id');

      $.ajax({
        url: endpoint
      })
        .done(function(info) {
          $('.modal-media-title').html(info.name);
          $('.js-modal').addClass('is-visible');
          $('.js-modal-overlay').addClass('is-visible');
        });
    });
  });
})();
