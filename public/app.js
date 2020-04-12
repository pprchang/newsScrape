//Grab the articles as a json

function renderArticles(data) {
  // const infoDiv = $('#info');
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

function loadArticles() {
  $.ajax({
    method: 'GET',
    url: '/articles',
  }).done((data) => {
    console.log(data);
    renderArticles(data);
  });
}

//load current article in db
loadArticles();

//scrape new article
$('#newScrape').on('click', () => {
  $.ajax({
    method: 'Get',
    url: '/scrape',
  }).done((data) => loadArticles(data));
});

//click on save article buton

$(document).on('click', '.saveBtn', function () {
  const id = $(this).attr('data-id');

  $.ajax({
    method: 'Put',
    url: '/saved/' + id,
  }).done((data) => console.log(data));
});

//clear button is clicked
$('#clear').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/clearArticle',
  }).done((data) => {
    console.log(data);
    $('#info').empty();
  });
});
