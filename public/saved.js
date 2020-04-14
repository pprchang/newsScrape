function renderArticles(data) {
  //   const infoDiv = $('#info');
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

function loadArticles() {
  $.ajax({
    method: 'GET',
    url: '/saved',
  }).done((data) => {
    console.log(data);
    renderArticles(data);
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
  }).done((data) => {
    console.log(data);
    loadArticles();
  });
});

//clear button is clicked
$('#clear').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/clearSaved',
  }).done((data) => {
    console.log(data);
    $('#info').empty();
  });
});

$(document).on('click', '.noteBtn', function () {
  $('.modal-title').empty();
  $('.input').empty();

  // Save the id from .btn-note
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId,
  })
    // With that done, add the note information to the page
    .done(function (data) {
      console.log(data);

      $('.modal-title').append(`<h5>${data.title}</h5>`);
      $('.input').append(`
      <textarea id='bodyinput' name='body' rows='6' style='width:100%'></textarea>
      <button data-id="${data._id}" id="saveNote" class='btn btn-primary '>Save Note</button><button data-id="${data._id}" id="deleteNote" class='btn btn-danger ml-2 '>Delete Note</button><button class='btn btn-dark ml-2' data-dismiss="modal">Close</button>
      `);

      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// When you click the Save Note button
$(document).on('click', '#saveNote', function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');
  // console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      // Value taken from note textarea
      body: $('#bodyinput').val(),
    },
  }).done(function (data) {
    // Log the response
    console.log(data);
    // Empty the notes section
    // $("#bodyinput").empty();
  });

  // Remove the values entered in the input and textarea for note entry
  // $('#bodyinput').val('');
});

//when delete button is clicked ==deleting note
$(document).on('click', '#deleteNote', function () {
  let id = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/deleteNote/' + id,
  }).then((data) => {
    console.log(data);
    $('#bodyinput').empty();
  });
  alert("Please click 'Save Note' before closing");

  $('#bodyinput').val('');
});
