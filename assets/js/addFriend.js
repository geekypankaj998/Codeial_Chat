


console.log('JS file to add friend');
console.log($('#friendForm'));
//Linking the form button click with the  AJAX 
let form = $('#friendForm');
let id = form.attr('action').split('/')[3];

console.log(form);
$('#friendForm').submit(function(e){
    e.preventDefault(); 
    let friendshipStatus = $('#friendForm button').attr('data-like');
    console.log('Friendship Status before Pressing Button : ',friendshipStatus);
    $.ajax({
      method:'POST',
      url:`/users/addFriend/${id}`,
      // data: form.serialize()               this is not working for me so manually adding content as json inside data
      data : {
               friendshipStatus : friendshipStatus  
             }
    })
    .done(function(data){
      console.log(' Inside Add Friend Success');
      console.log(data);
      console.log(data.data);
      let verdict = data.data;
      // true is received that means at front-end I should see remove as value and do the rest changes
      if(verdict==true){
        $('#friendForm button').attr('data-like',verdict);
        $('#friendForm button').text('Remove Friend');
       
      }
      else{
        $('#friendForm button').attr('data-like',verdict);
        $('#friendForm button').text('Add Friend');
      }
      
    })
    .fail(function(err){
     console.log(' Error in Add Friend : ',err);
    })
  });