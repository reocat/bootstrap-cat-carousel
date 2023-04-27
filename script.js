$(document).ready(function() {
  // Load initial set of images
  var apiUrl = getApiUrl();
  loadImages(apiUrl);
  
  // Listen for the "slid" event on the carousel
  $('#cat-carousel').on('slid.bs.carousel', function() {
    // Check if we're at the last item in the carousel
    var $items = $('.carousel-item');
    var currentIndex = $items.index($('.active'));
    if (currentIndex == $items.length - 1) {
      // We're at the last item, so load a new set of images
      var apiUrl = getApiUrl();
      loadImages(apiUrl);
    }
  });

  // Listen for the "click" event on the button
  $('#api-toggle-button').on('click', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var apiParam = urlParams.get('catapi') || urlParams.get('neko');
    var newApiParam = apiParam == '1' ? '0' : '1';
    urlParams.set(apiParam == '1' ? 'catapi' : 'neko', newApiParam);
    window.location.search = urlParams.toString();
  });
});

function getApiUrl() {
  var urlParams = new URLSearchParams(window.location.search);
  var nekoApiParam = urlParams.get('neko');
  if (nekoApiParam == '1') {
      return 'https://nekos.life/api/v2/img/neko';
    } else {
      return 'https://api.thecatapi.com/v1/images/search?limit=10';
    }
  }
}

function loadImages(apiUrl) {
  $.ajax({
    url: apiUrl,
    dataType: 'json',
    success: function(data) {
      // Clear out the existing carousel items
      $('.carousel-inner').empty();
      
      // Add the new images to the carousel
      for (var i = 0; i < data.length; i++) {
        var $item = $('<div>').addClass('carousel-item');
        var $img = $('<img>').addClass('d-block w-100').attr('src', data[i].url);
        $item.append($img);
        $('.carousel-inner').append($item);
      }
      
      // Set the first item as active and show the carousel
      $('.carousel-item:first').addClass('active');
      $('#cat-carousel').show();
    }
  });
}
