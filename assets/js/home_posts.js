{   
  // method to submit the form data for new post using AJAX
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
                   let newPost = newPostDom(arg);
                
                   $('#posts-list-container>ul').prepend(newPost);
                   deletePost($(' .delPost', newPost));

                   // call the create comment class
                   new PostComments(data.data.post._id);
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
       
          <a class='fas fa-trash delPost' href="/post/destroy/${data.post._id}"></a> 
         
         ${data.post.content}
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
          let postId = self.prop('id').split("-")[1]
          new PostComments(postId);
      });
  }

  console.log(this);

  createPost();
  convertPostsToAjax();
}