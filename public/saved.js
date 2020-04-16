//function to render article
function renderArticles(data) {
  $('#info').empty();

  for (let i = 0; i < data.length; i++) {
    $('#info').append(`<div class="card border border-success rounded">
  <a href= "https://yahoo.com${data[i].link}" target="_blank"><h5 class="card-header bg-success text-white">${data[i].title}</h5></a>
  <div class="card-body bg-light">
    <h5 class="card-title">Summary</h5>
    <p class="card-text" id="summary">${data[i].summary}</p>
    <button class="btn btn-danger deleteBtn" data-id="${data[i]._id}"><h6>Delete Article</h6></button>
    <button class="btn btn-warning noteBtn ml-2" data-id="${data[i]._id}" data-toggle='modal' data-target='#myModal'><h6>Note</h6></button>
    
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
    url: '/saved',
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

//load current article in db
loadArticles();

//when delete button is clicked === deleting article
$(document).on('click', '.deleteBtn', function () {
  let id = $(this).attr('data-id');
  $.ajax({
    method: 'PUT',
    url: '/delete/' + id,
  })
    .then((data) => {
      console.log(data);
      loadArticles();
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

//clear button is clicked --empty info div
$('#clear').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/clearSaved',
  })
    .then((data) => {
      console.log(data);
      $('#info').empty();
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

//note button is click --add note and toggle modal
$(document).on('click', '.noteBtn', function () {
  $('.modal-title').empty();
  $('.input').empty();

  // Save the id from .btn-note
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId,
  })

    .then(function (data) {
      console.log(data);
      //append title and id to modal
      $('.modal-title').append(`<h5>${data.title}</h5>`);
      $('.input').append(`
      <textarea id='bodyinput' name='body' rows='6' style='width:100%'></textarea>
      <button data-id="${data._id}" id="saveNote" class='btn btn-primary'data-dismiss="modal">Save Note</button><button class='btn btn-dark ml-2' id="close"data-dismiss="modal">Close</button>
      `);

      // If there's a note in the article
      if (data.note.body) {
        $(`#oldNote`).empty();

        // Place the body of the note in the body textarea
        $('#oldNote').append(
          `<textarea id='bodyinput' name='body' rows='6' style='width:100%'>${data.note.body}</textarea ><button data-id="${data._id}" id="deleteNote" class='btn btn-danger ml-2'>Delete Note</button>`
        );
      }
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

// When you click the Save Note button
$(document).on('click', '#saveNote', function () {
  // Grab the id associated with the article from the submit button
  location.reload();

  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      // take value inside note and assign to body
      body: $('#bodyinput').val(),
    },
  })
    .then(function (data) {
      // Log the response
      console.log(data);
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});

//when delete button is clicked ==deleting note
$(document).on('click', '#deleteNote', function () {
  let id = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/deleteNote/' + id,
  })
    .then((data) => {
      console.log(data);
      $('#bodyinput').empty();
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });

  $('#bodyinput').val('');
  $('#oldNote').remove();
});
