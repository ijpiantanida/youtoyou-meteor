Meteor.publish("all-videos", function(){
  return Videos.find({$or: [{ isPublic: true}, {userId: this.userId}]})
})