$(document).ready(function() {
  var currentAPI = 'catapi';

  // Load initial images
  loadImages(currentAPI, 5);

  // Listen for carousel slide events
  $('#carousel').on('slid.bs.carousel', function() {
    var $items = $('.carousel-item');
    var currentIndex = $items.index($('.active')[0]);
    if (currentIndex === $items.length - 1) {
      // Load more images if we're on the last item
      loadImages(currentAPI, 5);
    }
  });

  // Listen for switch button clicks
  $('#switch-btn').on('click', function() {
    if (currentAPI === 'catapi') {
      currentAPI = 'neko';
      $(this).text('Switch to Cat API');
    } else {
      currentAPI = 'catapi';
      $(this).text('Switch to Neko API');
    }
    // Load new images using the current API
    loadImages(currentAPI, 5);
  });
});

function loadImages(api, limit) {
  var apiURL = '';
  if (api === 'catapi') {
    apiURL = 'https://api.thecatapi.com/v1/images/search?limit=' + limit;
  } else if (api === 'neko') {
    apiURL = 'https://nekos.life/api/v2/img/neko?count=' + limit;
  }
  $.ajax({
    url: apiURL,
    dataType: 'json',
    success: function(data) {
      // Clear the carousel
      $('.carousel-inner').empty();
      
      // Add a new item for each image
      $.each(data, function(index, cat) {
        var $item = $('<div>').addClass('carousel-item');
        if (index === 0) {
          $item.addClass('active');
        }
        var $img = $('<img>').addClass('d-block w-100').attr('src', cat.url).attr('alt', 'Random cat image');
        $item.append($img);
        $('.carousel-inner').append($item);
      });

      // Refresh carousel
      $('.carousel').carousel('pause').removeData().carousel({
        interval: false,
        ride: false
      });
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log('Error loading images: ' + errorThrown);
    }
  });
}
