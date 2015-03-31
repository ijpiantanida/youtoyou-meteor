Meteor.publish("all-videos", function(){
  return Videos.find({$or: [{ isPublic: true}, {userId: this.userId}]})
})

Meteor.publish("public-users", function(userIds){
  check(userIds, [String])
  return Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1}})
})
