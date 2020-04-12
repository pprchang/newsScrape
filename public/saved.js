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
    <button class="btn btn-warning noteBtn ml-2" data-id="${data[i]._id}" data-toggle='modal' data-target='#noteModal'><h6>Note</h6></button>
    
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

//when delete button is clicked
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

//note button is clicked
$(document).on('click', '.noteBtn', function () {
  $('.modal-title').empty();
  $('.input').empty();
  let id = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + id,
  }).then((data) => {
    console.log(data);

    $('.modal-title').append(`${data.title}`);
    $('#saveNote').attr(`data-id="${data._id}"`);
    $('#deleteNote').attr(`data-id="${data._id}"`);

    //   $('#noteModal').append(`
    //   <div class="modal-dialog">
    //   <div class="modal-content">
    //     <div class="modal-header bg-success">
    //       <div class="modal-title "><h5 class="text-white">${data.title}</h5></div>
    //     </div>
    //     <div class="modal-body">
    //       <p id="note"><h5>Note<h5></p>
    //       <div class="input">
    //       <textarea id="bodyInput" name="body" style="width: 100%;"></textarea>
    //       </div>
    //       <button data-id="${data._id}" id="saveNote" class="btn btn-success mt-2">Save Note</button>
    //     </div>
    //   </div>
    // </div>`);

    // $('.modal-title').append('<h5>' + data[i].title + '</h5>');
    // $('.input').append("<textarea id='bodyinput' name='body'></textarea>");
    // $('.input').append(
    //   "<button data-id='" +
    //     data._id +
    //     "' id='savenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>"
    // );

    // If there's a note in the article
    if (data.note) {
      // Place the body of the note in the body textarea
      $('#bodyInput').val(data.note.body);
    }
  });
});

//save note button is clicked
$(document).on('click', '#saveNote', function () {
  let id = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: '/articles/' + id,
    data: { body: $('#bodyInput').val() },
  }).then(function (data) {
    console.log(data);
  });
  $('#bodyInput').val('');
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

//when delete button is clicked
$('#deleteNote').on('click', function () {
  let id = $(this).attr('data-id');
  $.ajax({
    method: 'GET',
    url: '/deleteNote/' + id,
  }).done((data) => {
    console.log(data);
  });
});
