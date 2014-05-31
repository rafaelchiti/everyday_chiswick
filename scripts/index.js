var $ = require('jquery');
var _ = require('underscore');

// Otherwise velocity fails
if (window) {
  window.jQuery = $;
}

var velocity = require('velocity-animate');


$('body').on('click', '.photos img', toggleImage);

navigateTo();


$(document).on('scroll', _.throttle(onScroll, 200));

function onScroll() {
  if ($('.photos').hasClass('is-focusing')) {
    return;
  }

  $('.photos img').each(function(event){
    if ($(this).offset().top < window.pageYOffset + 100 && $(this).offset().top + $(this).height() > window.pageYOffset + 100) {
      window.location.hash = '_' + (+$(this).index() + 1);
    }
  });
};


function clearHash() {
  window.location.hash = '';
};

function navigateTo() {
  var hash = window.location.hash;

  if (!hash) {
    return;
  }

  if (hash[1] === '_') {
    var photoNumber = hash.replace('#_', '');
    var $img = $($('.photos img').get(+photoNumber -1));
    $img.velocity('scroll', {offset: -50});
  } else {
    var photoNumber = hash.replace('#', '');
    var $img = $($('.photos img').get(+photoNumber -1));
    focus($img);
  }

};

function toggleImage(event) {
  var $img = $(event.currentTarget);

  if ($img.data('focused') === true) {
    unfocus($img);
  } else {
    focus($img);
  }


};

function focus($img) {
  window.location.hash =  +$img.index() +1;
  $('.js-share-info').fadeIn();
  $('.js-photos').addClass('is-focusing');
  $img.data('focused', true);
  $('.photos img').hide();
  $img.show();
  $img.velocity({'width': '+=400px', 'margin-left': '-=200px'});
  $('body').velocity('scroll');
  $('.js-share-url').text(window.location);
};

function unfocus($img) {
  window.location.hash = '_' + (+$img.index() +1);
  $('.js-share-info').fadeOut();
  $('.js-photos').removeClass('is-focusing');
  $img.data('focused', false);
  $('.photos img').show();
  $img.velocity({'width': '-=400px', 'margin-left': '+=200px'}).velocity('scroll', {offset: -100});
};
