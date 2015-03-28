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