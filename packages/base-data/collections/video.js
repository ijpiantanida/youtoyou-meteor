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
  createdAt: {
    type: Date,
    autoValue: function () {
      if (!this.isSet) {
        return new Date();
      }
    }
  }
});

Videos = new Mongo.Collection("videos")
Videos.attachSchema(Schemas.Video)