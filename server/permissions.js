Videos.allow({
  insert: function(userId, video) {
    return true
  }
})

Likes.allow({
  insert: function(userId, like) {
    if(like.userId != userId){
      return false
    }
    existingLike = Likes.likeByUser(userId, like.videoId)
    return !existingLike
  },
  remove: function(userId, like){
    return like.userId == userId
  }
})