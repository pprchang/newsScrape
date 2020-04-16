//function to render article
function renderArticles(data) {
  $('#info').empty();

  for (let i = 0; i < data.length; i++) {
    $('#info').append(`<div class="card border border-success rounded">
    <a href="https://yahoo.com${data[i].link}" target="_blank"><h5 class="card-header bg-success text-white"}">${data[i].title}</h5></a>
    <div class="card-body bg-light">
      <h5 class="card-title ">Summary</h5>
      <p class="card-text" id="summary">${data[i].summary}</p>
      <button class="btn btn-primary saveBtn" data-id="${data[i]._id}"><h6>Save Article</h6></button>
    </div>
  </div>
  <br>
`);
  }
}

//function to load article onto page
function loadArticles() {
  $.ajax({
    method: 'GET',
    url: '/articles',
  })
    .then((data) => {
      console.log(data);
      renderArticles(data);
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
}

//show scrape dive with message "click scrape new articles button"
$('#scrape').append(
  `<h5>Click "Scrape New Articles" button to get the lastest news</h5>`
);
//load current article in db
loadArticles();

//scrape new article
$('#newScrape').on('click', () => {
  $('#scrape').hide();
  $.ajax({
    method: 'Get',
    url: '/scrape',
  })
    .then((data) => loadArticles(data))
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

//click on save article button --save article
$(document).on('click', '.saveBtn', function () {
  const id = $(this).attr('data-id');

  $.ajax({
    method: 'Put',
    url: '/saved/' + id,
  })
    .then((data) => console.log(data))
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

//clear button is clicked -- clear all article in the info div
$('#clear').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/clearArticle',
  })
    .then((data) => {
      console.log(data);
      $('#info').empty();
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
  $('#scrape').show();
});
