console.log("JS file to add friend"),console.log($("#friendForm"));let form=$("#friendForm"),id=form.attr("action").split("/")[3];console.log(form),$("#friendForm").submit((function(o){o.preventDefault();let t=$("#friendForm button").attr("data-like");console.log("Friendship Status before Pressing Button : ",t),$.ajax({method:"POST",url:`/users/addFriend/${id}`,data:{friendshipStatus:t}}).done((function(o){console.log(" Inside Add Friend Success"),console.log(o),console.log(o.data);let t=o.data;1==t?($("#friendForm button").attr("data-like",t),$("#friendForm button").text("Remove Friend")):($("#friendForm button").attr("data-like",t),$("#friendForm button").text("Add Friend"))})).fail((function(o){console.log(" Error in Add Friend : ",o)}))}));