Meteor.publish("all-videos", function(){
  videos = Videos.find({$or: [{ isPublic: true}, {userId: this.userId}]})
  comments = Comments.find({videoId: {$in: _.pluck(videos.fetch(), '_id')}})
  return [videos, comments]
})

Meteor.publish("public-users", function(userId){
  check(userId, String)
  return Meteor.users.find({_id: userId}, {fields: {username: 1}})
})

Meteor.publish("likes", function(videoId){
  check(videoId, String)
  return Likes.find({videoId: videoId})
})
