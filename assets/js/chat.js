let show=false;
$('#chatHead').click(function(){
  if(show==false){
    $('#innerBlock').css( 
      {
        "display" : 'flex',
        "flex-direction" :'column'
      })

      $('#innerBlockDiv').css( 
        {
          "display" : 'flex',
          "flex-direction" :'column'
        }
        
    );
    console.log('Show Val : ',show);
    show=true;

  }
  else{
    $('#innerBlock').css( {display : 'none'});
    console.log('Show Val : ',show);
    show=false;
  }
   $('#innerBlock').toggleClass('toggleClass');

})