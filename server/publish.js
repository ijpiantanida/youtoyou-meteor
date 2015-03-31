Meteor.publish("all-videos", function(){
  return Videos.find({$or: [{ isPublic: true}, {userId: this.userId}]})
})

Meteor.publish("public-users", function(userId){
  check(userId, String)
  return Meteor.users.find({_id: userId}, {fields: {username: 1}})
})
