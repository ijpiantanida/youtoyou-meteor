Template.titleLayout.helpers({
  username: function(){
    return Meteor.user().username
  },
  waitingForValidation: function(){
    if(!Meteor.user()) return 
    return !Meteor.user().emails[0].verified
  }
})

Template.titleLayout.events({
  'click .log-out': function(){
    Meteor.logout()
    Router.go('home')
  }
})