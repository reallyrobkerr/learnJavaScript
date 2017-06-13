(function() {
  function createListElement(newEntry, author) {
    var listElement = '<li class="news-item">';
    listElement += '<a class="news-link" href="#">' + newEntry + '</a>';
    listElement += '<ul class="news-meta"> ';
    listElement += '<li class="news-meta-item"> ';
    listElement += '<em>Posted by: </em> ';
    listElement += '<a class="news-author js-show-modal" href="#">' + author + '</a>';
    listElement += '</li> ';
    listElement += '<li class="news-meta-item"> ';
    listElement += '<a href="#">Comments</a> ';
    listElement += '</li> ';
    listElement += '<li class="news-meta-item"> ';
    listElement += '<a class="js-like" href="#">Do you like this?</a> ';
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

    $('.news').on('click', '.js-like', function(event) {
      event.preventDefault();

      // ultra basic-bitch-newfag like/unlike toggle
      if ($(this).text() === 'Like') {
        $(this).text('Unlike')
        .closest('.news-item')
        .addClass('is-liked');
      } else {
        $(this).text('Like')
        .closest('news-item')
        .removeClass('is-liked');
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
        $('.news').prepend(createListElement(newEntry, author));
        $('.js-form').toggleClass('is-visible'); // hide the input field again
        $('.news-brief').prepend('<li class="news-item"><a class="news-link" href="#">' + newEntry + '</a>'); // add just the link to the modal
        $(this).val(null); // reset the input
      };
    });

    //-----------------------------------------------
    //   Modal
    //-----------------------------------------------

    $('.news').on('click', '.js-show-modal', function(event) {
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
  });
})();
