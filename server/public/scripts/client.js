console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveKoala);
  $('#viewKoalas').on('click', '.transfer', transferKoala);
    console.log( 'in addButton on click' );
  $('#viewKoalas').on('click', '.delete-button', deleteKoala);
    // saveKoala() );
    // getKoalas();
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    // let koalaToSend = {
    //   name: $('#nameIn').val(), 
    //   age: $('#ageIn').val(),
    //   gender: $('#genderIn').val(),
    //   readyForTransfer:  $('#readyToTransgerIn').val(),
    //   notes: $('#notesIn').val(),
    // };
    // // call saveKoala with the new obejct
    // saveKoala( koalaToSend );
}

function getKoalas(){
  console.log( 'in getKoalas' );
  $('#viewKoalas').empty();
  // ajax call to server to get koalas
  $.ajax ({
    url:'/koalas',
    method: 'GET'
  }).then((response) => {
    console.log('response from GET:', response);
    renderTable(response);
  }).catch((error)=> {
    console.log('error in GET:', error);
  })
} // end getKoalas

function saveKoala(){
  // console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  // Get info to send to the server
      let newKoala = {
        name: $('#nameIn').val(), 
        age: $('#ageIn').val(),
        gender: $('#genderIn').val(),
        ready_to_transfer: $('#readyForTransferIn').val(),
        notes: $('#notesIn').val()
    };
    // Send the new koala to the server as data
    $.ajax({
        method: 'POST',
        url: '/koalas',
        data: newKoala,
    }).then(function(response) {
        console.log(response);
        getKoalas();
    }).catch(function(error) {
        console.log('error in koala post', error); 
        alert('Error adding koala in client. Please try again later.')       
    });
    console.log('Adding koala in client', newKoala);
}

function renderTable(koalas) {
  
  for (let i=0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td>
        <button data-id = ${koala.id} class = "delete-button" >Delete</button>
      </td>
      <td><button data-status="${koala.ready_to_transfer}" data-id=${koala.id} class="button transfer" >Transfer</button></td>
    </tr>
  `)
  }
}

// function to delete koala
function deleteKoala() {
  let koalaId = $(this).data('id');

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`,
    data: {id: koalaId}
  }).then(function() {
    console.log('Here');
    // Once delete is sent, refresh the koala table
    getKoalas()
    // getKoalas();
  }).catch(function(error) {
    alert('Something went wrong in the DELETE /Koalas :(', error)
  })
}

function transferKoala() {
  let id = $(this).data('id');
  let transferStatus = $(this).data('status');
  console.log('this should be Koalas id:', id );
  $.ajax({
    method: 'PUT',
    url: `/koalas/${id}`,
    data: {status: transferStatus}
  })
  .then(function() {
    getKoalas();
  })
  .catch(function(error) {
    alert('ERROR in TRANSFERKOALA FUNCTION IN CLIENT', error);
  })
}

