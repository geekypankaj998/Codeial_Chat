// This acts as a chat server for socket.io / can be said as Observer in the Observer/Subscriber design Pattern
module.exports.chatSockets = function(socketServer){
  // io will be handling all the connections and will contain all the sockets
    const io = require('socket.io')(socketServer, {
      cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
      }
    });
   
    io.sockets.on('connection',function(socket){
        console.log('New Connection received',socket.id);

        socket.on('join_room',function(data){
            console.log('Joining Req Received : ',data);
            socket.join(data.chatroom);    //adding the current chatEngine in to the chat_room if already created otherwise will create a new room
            

            // need to provide notification to all the users
            io.in(data.chatroom).emit('user_joined',data.userName);   

        });


        socket.on('click_event',function(data){
          console.log(' Reached Config part for Click Event ');
          io.in(data.chatroom).emit('click_comp',data);            
        });

        socket.on('disconnect',function(){
          console.log(' Socket disconnected ');
        })
    });

   
}