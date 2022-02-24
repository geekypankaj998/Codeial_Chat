
 {
  let noty = function(event,status){
    var text;
    if(event=='Comment'){
       if(status=='saved'){
        text = event+' is '+status
       }
       else{
        text = event+' is '+status
       }
    }
    else{
      if(status=='saved'){
        text = event+' is '+status
       }
       else{
        text = event+'and all associated Comments are '+status
       }
    }
    new Noty({
      type : 'success',
      text: `${text}`,
      layout : 'topRight',
      theme : 'metroui',
      timeout: 1500
  }).show();
  }    
   let createDOMPost = function(data){
     console.log('Inside createDOMPost',data.post);
  return $(`<li id="post-${data.post._id}">
  <p class="postInfo">
   
      <a class='fas fa-trash delPost' href="/post/destroy/${data.post._id}"></a> 
     
     ${data.post.content}
     <br>
    <small class="userName">
     ${data.userCurr}
    </small>
  </p>

  <div class="post-comment-box">
    
    <form class="formStyle commForm" action="/comment/save" method="POST">
      <textarea name="content" id="" cols="30" rows="3" placeholder="Enter your comments here" required></textarea>
      <!-- <input type="submit" value="Add Comment"> -->
      <button type="submit">Add Comment</button>
      <input type="hidden" name="post" value="${data.post._id}">
   </form>
    
  <div class="post-list-comments">
    <ul id="comment-${data.post._id}">
        
    </ul>

  </div>
  </li>`);
  }

  let createPost = function(){
     let newPostForm = $('#new-post-form');
      newPostForm.submit(function(e){
         e.preventDefault();
         $.ajax({
           url:"/post/save",
           method:"POST",
           data : newPostForm.serialize(),
           success: function(data){
                   console.log('&&&&&&&&&&&&&',data);
                   let arg = data.data;
                   console.log(arg);
                   let newPost = createDOMPost(arg);
                  //$('classlist',newPost) ; 
                   $('.post-list-container>ul').prepend(newPost);
                   noty('Post','Saved');
           },
           error:function(){
             console.log('Error Occured'); 
           }
         })
      }) 
  }

  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
     console.log(deleteLink);
        e.preventDefault();  
        $.ajax({
          type: 'GET',
          url: $(deleteLink).prop('href'),
          success : function(data){
            console.log('Inside jQuery delete Funct');
            console.log(data);
            console.log(data.data);
            $(`#post-${data.data.post_id}`).remove();
            noty('Post','Deleted');
            },error : function(error){
            console.log(error.responseText);
          }
        });    
  });
 }
 
 let delGlobalDel = function(){
  let lists = $(' .delPost');  
    console.log(lists);
    $(lists).each(function(){
        deletePost($(this));
    });
 }
 createPost();
 delGlobalDel();

 let createComment = function(){
  //I will get the list of all forms 
  let commentList = $('.post-comment-box > form');   
  $(commentList).each(function(){
    $(this).submit(function(e){
      e.preventDefault();
      console.log('Comment Added',$(this));
      $.ajax({
        type:'POST',
        url: '/comment/save',
        data : $(this).serialize(),
        success:function(data){
          console.log('Entered comment sectn');
           
          console.log(data);
          let obj = $(`
          <li id='${data.comment._id}'>
             <a  class='fas fa-trash delComment' href='/comment/destroy/${data.comment._id}'></a> 
               <p>
               ${data.comment.content}
               <br>
               <small>
               ${data.userCurr}
               </small>
               </p>
            </li>
          `);
          console.log('Current Comment Post Info',`${data.comment.post}`);
          console.log( $(`#comment-${data.comment.post}`));
          $(`#comment-${data.comment.post}`).append(obj);
          console.log('Sucess Comment Added');

        },error:function(err){
            console.log('Error',err.responseText);      
        }
      });
   }); 
  });
 
 }
 createComment();
 
 let deleteComment = function(){
   let lists = $('.delComment');
   console.log(lists);
   $(lists).each(function(){{
        deleteCommentClick($(this));
   }});
 }

 let deleteCommentClick = function(deleteLink){
 
    $(deleteLink).click(function(e){
     console.log(deleteLink);
        e.preventDefault();  
        $.ajax({
          type: 'GET',
          url: $(deleteLink).prop('href'),
          success : function(data){
            console.log('Inside jQuery Commemt Delete Funct');
            console.log(data);
            // console.log(data.data);
            $(`#${data.commentId}`).remove();
            noty('Post','Deleted');
            },error : function(error){
            console.log(error.responseText);
          }
        });    
  });

 }

 deleteComment();
 }
