Videos.allow({
  insert: function(userId, video) {
    return true
  },
  update: function(userId, video, fieldNames, modifier){
    if(!userId || video.userId != userId){return false}
    return _.isEqual(fieldNames, ['isPublic'])
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

Comments.allow({
  insert: function(userId, comment) {
    return userId && comment.userId == userId
  }
})