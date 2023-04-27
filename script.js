$(document).ready(function() {
  var currentAPI = 'https://api.thecatapi.com/v1/images/search';

  // Load initial images
  loadImages(currentAPI + '?limit=5');

  // Listen for carousel slide events
  $('#carousel').on('slid.bs.carousel', function() {
    var $items = $('.carousel-item');
    var currentIndex = $items.index($('.active')[0]);
    if (currentIndex === $items.length - 1) {
      // Load more images if we're on the last item
      loadImages(currentAPI + '?limit=5');
    }
  });

  // Listen for switch button clicks
  $('#switch-btn').on('click', function() {
    if (currentAPI === 'https://api.thecatapi.com/v1/images/search') {
      currentAPI = 'https://nekos.life/api/v2/img/neko';
      $(this).text('Switch to Cat API');
    } else {
      currentAPI = 'https://api.thecatapi.com/v1/images/search';
      $(this).text('Switch to Neko API');
    }
    // Load new images using the current API
    loadImages(currentAPI + '?limit=5');
  });
});

function loadImages(apiURL) {
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
