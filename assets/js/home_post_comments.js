class PostComments{
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId){
      this.postId = postId;
      this.postContainer = $(`#post-${postId}`);
      this.newCommentForm = $(`#post-${postId}-comments-form`);

      this.createComment(postId);
 
      let self = this;
      // call for all the existing comments
      $(' .delComment', this.postContainer).each(function(){
          self.deleteComment($(this));
      });
  }


  createComment(postId){
      let pSelf = this;
      this.newCommentForm.submit(function(e){
          e.preventDefault();
          let self = this;
          console.log('Inside Create Comment'); 
          $.ajax({
              type: 'post',
              url: '/comment/save',
              data: $(self).serialize(),
              success: function(data){
                  console.log("Inside Create Comment ",data);
                  let newComment = pSelf.newCommentDom(data.comment);
                  $(`#comment-${postId}`).prepend(newComment);
                  pSelf.deleteComment($(' .delComment', newComment));
                  console.log('Comment Added'); 
                  new Noty({
                      theme: 'relax',
                      text: "Comment published!",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();

              }, error: function(error){
                  console.log(error.responseText);
              }
          });


      });
  }


  newCommentDom(comment){
      // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
      return $(`<li id="${ comment._id }">

         <a class=" fas fa-trash delComment" href="/comment/destroy/${comment._id}"></a>   
         <p>
         ${comment.content}
         <br>
         <small>
           ${comment.user.name}
         </small>
        </p>    

              </li>`);
  }


  deleteComment(deleteLink){
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type: 'get',
              url: $(deleteLink).prop('href'),
              success: function(data){
                  console.log('Inside delete Comment ',data);
                  $(`#${data.comment}`).remove();

                  new Noty({
                      theme: 'relax',
                      text: "Comment Deleted",
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
}