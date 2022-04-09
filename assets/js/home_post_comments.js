// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class PostComments{
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId){
      this.postId = postId;
      this.postContainer = $(`#post-${postId}`);
      this.newCommentForm = $(`#post-${postId}-comments-form`);

      this.createComment(postId);
 
      let self = this; //the current object
      // call for all the existing comments
      $(' .delComment', this.postContainer).each(function(){
          self.deleteComment($(this));
          //here this is the link on which click is made
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
      // I've added a class 'delComment-button' to the delete comment link and also id to the comment's li

    return(`<li id="${comment._id}">
    <p >
        <div class="horizontalStyle"> 
          <div class="inlineStyle">
         
            <a href="/like/toggle/?id=${comment._id}&type=Comment" class="delLike" data-like="0"><i class="fas fa-regular fa-thumbs-up"> 0
            </i>
            </a> 
            
          </div>
         
          <div  class="inlineStyle">
              ${comment.content}
          </div>
        </div>

       <small>
        ${comment.user.name}
       </small>
    </p>
      
        <a class='fas fa-trash delComment' href="/comment/destroy/${comment._id}"></a> 
    
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