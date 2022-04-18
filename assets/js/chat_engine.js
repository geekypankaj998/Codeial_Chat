// This file is actually acting as a socket server at the client side
// Acts as a Subscriber in the Obsever/subscriber pattern

class ChatEngine {
  constructor(chatBoxId, userName,userEmail) {
      this.chatBoxId = $(`#${chatBoxId}`); //this will target the chatBox
      this.userName = userName;
      this.userEmail = userEmail;
      //  Now setting up the connection with the server
      this.socket = io.connect("http://localhost:5000");
      //No one is accepting this connection will be dealing that in future with connection Handler

    if(this.userName && this.userEmail){           //this means it will work for valid user only
      this.connectionHandler();
      // this.clickAction();
    }
  }

  connectionHandler() {
    let self = this; 
    console.log('Value of this : ',this);   //here this is the chatroom instance
   
    this.socket.on("connect", function () {
      console.log("Connection established using sockets");
      console.log('Inside Connection from Client side ',this);  //here this is socket ref 
      
      self.socket.emit('join_room',{
        userName : self.userName,
        chatroom : 'codeial'
      });
    });
    
     self.socket.on('user_joined',function(data){
        console.log('A User joined',data); 
     });

     $('#chatInp').submit(function(e){
      console.log('Click Event Started');
      e.preventDefault();
      let textInp = $('#chatText').val();
      console.log('Inp Text : ',textInp);
      self.socket.emit('click_event',{
            message : textInp,
            userName : self.userName,
            userEmail : self.userEmail,
            chatroom : 'codeial'  
      });
       
     });

     self.socket.on('click_comp',function(data){
          console.log('Click Completed Started :)',data);
          let info = data.message;
          let userInfo = data.userName;
          console.log('Before Adding Div : ', $('#innerBlockDiv div:last-child'));
          let block = `<div>${info}</div>`;
          
          let classType='';
          $('#innerBlockDiv').append(block);
          if(self.userEmail==data.userEmail){
              classType='selfMessage';
          }
          else{
              classType='otherMessage';
          }
         $('#innerBlockDiv div:last-child').attr('class',classType);
         console.log('Click Completed :)');
         let last =  $('#innerBlockDiv div:last-child');
         console.log('After Adding Div Newly Added Div : ',last);
     });
  }

}
