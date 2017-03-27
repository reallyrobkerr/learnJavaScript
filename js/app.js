/*-----------------------------------------------
    DOCUMENT READY
-----------------------------------------------*/

$(document).ready(function() {

  //-----------------------------------------------
  //   Like
  //-----------------------------------------------
  
  $('.js-like').on('click', function(event) {
    event.preventDefault();
    // ultra basic-bitch-newfag like/unlike toggle
    if ($(this).text() === 'Do you like this?') {
      $(this).text('Weirdo.')
      .closest('.news-item')
      .addClass('is-liked');
    } else {
      $(this).text('Do you like this?')
      .closest('news-item')
      .removeClass('is-liked')
    };
  });

  //-----------------------------------------------
  //   Add Link
  //-----------------------------------------------

  $('.js-add-link').on('click', function (event) {
    event.preventDefault();

    $('.js-form').toggleClass('is-visible');
  });

  $('#form-link-input').keypress(function (event){
    if (event.which === 13) { // if enter is pressed in the form-link-input field
      console.log("keypress processed"); // write to the console to indicate something happened
      event.preventDefault(); // prevent page reload
      var newEntry = $(this).val(); // store the text input in a variable
      $('.news').prepend('<li class=\'news-item\'> \
  <a class=\'news-link\' href=\'#\'>' + newEntry + '</a> \
  <ul class=\'news-meta\'> \
    <li class=\'news-meta-item\'> \
      <em>Posted by:</em> \
      <a class=\'news-author js-show-modal\' href=\'#\'>Rob</a> \
    </li> \
    <li class=\'news-meta-item\'> \
      <a href=\'#\'>0 Comments</a> \
    </li> \
    <li class=\'news-meta-item\'> \
      <a class=\'js-like\' href=\'#\'>Do you like this?</a> \
    </li> \
  </ul> \
</li>'); // shove new items at the top of the list, probably not the best way to do it
      $('.js-form').toggleClass('is-visible'); // hide the input field again
      $(this).val(null); // reset the input
    };
  });

  //-----------------------------------------------
  //   Modal
  //-----------------------------------------------

  $('.js-show-modal').on('click', function (event) {
    event.preventDefault();

      $('.js-modal').addClass('is-visible');
      $('.js-modal-overlay').addClass('is-visible');
  });

  $('.js-modal-overlay').on('click', function (event) {
    $('.js-modal').removeClass('is-visible');
    $('.js-modal-overlay').removeClass('is-visible');
  });
});