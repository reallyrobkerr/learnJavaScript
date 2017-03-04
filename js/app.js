/*-----------------------------------------------
    DOCUMENT READY
-----------------------------------------------*/

$(document).ready(function() {
  $('.js-like').on('click', function(event) {
    event.preventDefault();

    $(this).text('OH MY GOD, you LIKE this!')
    .closest('.news-item')
    .addClass('is-liked');
  });
});