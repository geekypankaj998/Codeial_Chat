{   
  // method to submit the form data for new post using AJAX
  let createPost = function(){
     let newPostForm = $('#new-post-form');
      newPostForm.submit(function(e){
         e.preventDefault();
         console.log('AJAX call for Post Submit Done :)))');
         $.ajax({
           url:"/post/save",
           method:"POST",
           data : newPostForm.serialize(),
           success: function(data){
                   console.log('&&&&&&&&&&&&& Inside Home Post AJAX : ',data);
                   let arg = data.data;
                   console.log(arg);
                   let newPost = newPostDom(arg);
                
                   $('#posts-list-container>ul').prepend(newPost);
                  // in JS we used to do selector('#anytarget then inside that place')
                   //  in Jquery it could done by targetting the newly created DOM inside that getting the delete Class 
                   deletePost($(' .delPost', newPost));

                   // call the create comment class
                   new PostComments(data.data.post._id);

                   //call ToggleLike class on each delLike class elements inside ajax added content
                  //  $(' .delLike',newPost).each(function(){
                  //   console.log(this);
                  //   new ToggleLike(this);
                  //  });
                 
                  // above linking/binding of ToggleLike class can also be done in this way:
                  // this is the shortcut for the above task
                  new ToggleLike(' .delLike',newPost);

                   new Noty({
                    theme: 'relax',
                    text: "Post Created",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
           },
           error:function(){
             console.log('Error Occured'); 
           }
         })
      }) 
  }
  


  // method to create a post in DOM
  let newPostDom = function(data){
         console.log('Inside createDOMPost',data.post);
      return $(`<li id="post-${data.post._id}">
        <p class="postInfo">
        <div class="horizontalStyle">
          <div class="inlineStyle">
            <a href="/like/toggle/?id=${data.post._id}&type=Post" class="delLike" data-like="0"><i class="fas fa-regular fa-thumbs-up">0</i></a> 
          </div>


          <div class="inlineStyle">
            <strong>${data.post.content}</strong>
          </div>
        </div>
         
        <a class='fas fa-trash delPost' href="/post/destroy/${data.post._id}"></a>
      
        
         <br>
        <small class="userName">
         ${data.post.user.name}
        </small>
      </p>
    
      <div class="post-comment-box">
        
        <form class="formStyle commForm" id="post-${data.post._id}-comments-form"  action="/comment/save" method="POST">
          <textarea name="content"  cols="30" rows="3" placeholder="Enter your comments here" required></textarea>
       
          <button type="submit">Add Comment</button>
          <input type="hidden" name="post" value="${data.post._id}">
       </form>
        
      <div class="post-list-comments">
        <ul id="comment-${data.post._id}" class='centerList'>
            
        </ul>
      </div>
      </li>`);
      }


  // method to delete a post from DOM
  let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type: 'get',
              url: $(deleteLink).prop('href'),
              success: function(data){
                console.log(data);
                  $(`#post-${data.data.post_id}`).remove();
                  new Noty({
                      theme: 'relax',
                      text: "Post Deleted",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();
              },error: function(error){
                  console.log(error.responseText);
              }
          });

      });
  }





  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function(){
      $('#posts-list-container>ul>li').each(function(){
          let self = $(this);
          let deleteButton = $(' .delPost', self);
          deletePost(deleteButton);

          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1];

          new PostComments(postId);
      });
  }

  console.log('Checking');
  createPost();
  convertPostsToAjax();
}