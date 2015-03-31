Schemas.Like = new SimpleSchema({
  videoId: {
    type: String
  },
  userId:{
    type: String
  },
  createdAt: Schemas.Mixins.createdAt
});

Likes = new Mongo.Collection("likes")
Likes.attachSchema(Schemas.Like)

Likes.likeByUser = function(userId, videoId){
  return Likes.findOne({videoId: videoId, userId: userId})
}