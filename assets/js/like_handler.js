
console.log('Done');

class ToggleLike{
  constructor(toggleElement){
      this.toggler = toggleElement;
      this.toggleLike();
  }


  toggleLike(){
      $(this.toggler).click(function(e){
          e.preventDefault();
          let self = this;
          console.log('Inside AJAX Like');
          console.log(this);
            let inner = $(this).find("i");
            console.log(inner);
            
            console.log(inner.text());
          // this is a new way of writing ajax which you might've studied, it looks like the same as promises
          $.ajax({
              type: 'GET',
              url: $(self).attr('href'),
          })
          .done(function(data){
              let likesCount = parseInt($(self).attr('data-like'));
              console.log(likesCount);
              console.log(data);
              if (data.data.deleted == true){
                  likesCount -= 1;
                  
              }else{
                  likesCount += 1;
              }

              $(self).attr('data-like', likesCount);
              // $(self).html(`${likesCount} Likes`);
            //  let inner = $(this).find("i");
            //  console.log(inner);
            console.log(this);
            console.log($(this));
            inner.text(likesCount)
            console.log(inner.text());
         
            // console.log($(' i',$(this)));
            // $(' i',$(this)).html(likesCount);

              // <a href="/like/toggle/?id=<%=comment._id%>&type=Comment" class="delLike" data-like="0">
              // <i class="fas fa-regular fa-thumbs-up"><%=comment.like.length%></i>
              // </a> 

          })
          .fail(function(errData) {
              console.log('error in completing the request');
          });

      });
  }
}

console.log('CXlass Loaded :)');

$('.delLike').each(function(){
  let self = this;
  console.log(this);      
  let toggleLike = new ToggleLike(self);
});
