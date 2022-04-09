


console.log('JS file to add friend');
console.log($('#friendForm'));
//Linking the form button click with the  AJAX 
let form = $('#friendForm');
let id = form.attr('action').split('/')[3];
console.log(form);
$('#friendForm').submit(function(e){
    e.preventDefault(); 
    
    $.ajax({
      method:'POST',
      url:`/users/addFriend/${id}`,
      // data: form.serialize()               this is not working for me so manually adding content as json inside data
      data : form.serialize()
    })
    .done(function(data){
      console.log(' Inside Add Friend Success');
      console.log(data);
    })
    .fail(function(){
     console.log(' Error in Add Friend : ');
    })
  });