$(document).ready(function() {
  // Load initial set of images
  loadImages();
  
  // Listen for the "slid" event on the carousel
  $('#cat-carousel').on('slid.bs.carousel', function() {
    // Check if we're at the last item in the carousel
    var $items = $('.carousel-item');
    var currentIndex = $items.index($('.active'));
    if (currentIndex === $items.length - 1) {
      // We're at the last item, so load a new set of images
      loadImages();
    }
  });
});

function loadImages() {
  $.ajax({
    url: 'https://api.thecatapi.com/v1/images/search?limit=10',
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
