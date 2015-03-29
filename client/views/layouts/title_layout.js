Template.titleLayout.helpers({
  username: function(){
    return Meteor.user().username
  }
})
Template.titleLayout.events({
  'click .log-out': function(){
    Meteor.logout()
    Router.go('home')
  }
})