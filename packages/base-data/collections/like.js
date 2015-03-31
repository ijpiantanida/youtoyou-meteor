Schemas.Like = new SimpleSchema({
  videoId: {
    type: String
  },
  userId:{
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (!this.isSet) {
        return new Date();
      }
    }
  }
});

Likes = new Mongo.Collection("likes")
Likes.attachSchema(Schemas.Like)