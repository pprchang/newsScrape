//Grab the articles as a json
$.getJSON('/articles', function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $('#article').append(data[i].title);
    $('#link').append(data[i].link);
    $('#summary').append(data[i].summary);
    $('dataID').append(data[i]._id);
  }
});
