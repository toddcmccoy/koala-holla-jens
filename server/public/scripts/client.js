console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}







































function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax ({
    url:'/koalas',
    method: 'GET'
  }).then((response) => {
    console.log('reponse from GET:', response);
    renderTable(response);
  }).catch((error)=> {
    console.log('error in GET:', error);
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  // Get info to send to the server
    let newKoala = {
        name: $('#nameIn').val(), 
        gender: $('#genderIn').val(),
        age: $('#ageIn').val(),
        ready_to_tranfer: $('#readyToTransgerIn').val(),
        notes: $('#notesIn').val()
    };

    console.log('Adding koala in client', newKoala);

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
}

function renderTable(koalas) {
  
  for (let i=0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_for_transfer}</td>
      <td>${koala.notes}</td>
    </tr>
  `)
  }
}

