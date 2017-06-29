(function() {
  function createListElement(newEntry, author) {
    var listElement = '<li class="swapi-item">';
    listElement += '<a class="swapi-link" href="#">' + newEntry + '</a>';
    listElement += '<ul class="swapi-meta"> ';
    listElement += '<li class="swapi-meta-item"> ';
    listElement += '<em>Posted by: </em> ';
    listElement += '<a class="swapi-author js-show-modal" href="#">' + author + '</a>';
    listElement += '</li> ';
    listElement += '<li class="swapi-meta-item"> ';
    listElement += '<a href="#">Comments</a> ';
    listElement += '</li> ';
    listElement += '<li class="swapi-meta-item"> ';
    listElement += '<i class="fa fa-thumbs-o-up js-like" aria-hidden="true"> Like</i> ';
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

    $('#form-link-input').keypress(function(event) {
      if (event.which === 13) { // if enter is pressed in the form-link-input field
        event.preventDefault(); // prevent page reload
        var newEntry = $(this).val(); // store the text input in a variable
        var author = 'Author'; // placeholder for author. I don't have a session to get a current user from yet
        $('.swapis').prepend(createListElement(newEntry, author));
        $('.js-form').toggleClass('is-visible'); // hide the input field again
        $('.swapi-brief').prepend('<li class="swapi-item"><a class="swapi-link" href="#">' + newEntry + '</a>'); // add just the link to the modal
        $(this).val(null); // reset the input
      };
    });

    //-----------------------------------------------
    //   Modal
    //-----------------------------------------------

    $('.swapis').on('click', '.js-show-modal', function(event) {
      event.preventDefault();
      $('.js-modal').addClass('is-visible');
      $('.js-modal-overlay').addClass('is-visible');
    });

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
          $('.swapis').append(createListElement(info.results[i].name, 'SWAPI'));
        }
      });

    // from here I want to make the modal show more info on the character
    // name, age, some other shit?
    // a picture would be cool too (need different source for those)
    //
    // on click of .swapi-author, make another api call to swapi for that
    //  specific character
    // after character object is returned, deeply consider suicide

    $('.swapi-author').on('click', $.ajax({
      url: base
    })
      .done(function() {
      })
    );
  });
})();
