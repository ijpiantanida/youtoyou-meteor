Schemas.Video = new SimpleSchema({
  youtubeId: {
    type: String
  },
  thumbnail: {
    type: String
  },
  title: {
    type: String
  },
  duration: {
    type: Number
  },
  isPublic:{
    type: Boolean,
    defaultValue: false
  },
  userId:{
    type: String,
    optional: true
  },
  createdAt: Schemas.Mixins.createdAt
});

Videos = new Mongo.Collection("videos")
Videos.attachSchema(Schemas.Video)

Videos.helpers({
  likes: function () {
    return Likes.find({videoId: this._id})
  }
})