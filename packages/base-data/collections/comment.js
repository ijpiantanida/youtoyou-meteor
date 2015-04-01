Schemas.Comment = new SimpleSchema({
  videoId: {
    type: String
  },
  userId:{
    type: String
  },
  text: {
    type: String
  },
  createdAt: Schemas.Mixins.createdAt
});

Comments = new Mongo.Collection("comments")
Comments.attachSchema(Schemas.Comment)
