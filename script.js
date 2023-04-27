$(document).ready(function() {
  $.getJSON("https://api.thecatapi.com/v1/images/search?limit=5", function(data) {
    $.each(data, function(index, value) {
      $("#catCarousel .carousel-item:nth-child(" + (index + 1) + ") img").attr("src", value.url);
    });
  });
});
