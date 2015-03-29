Accounts.onEmailVerificationLink(function(token, doneCallback){
   Accounts.verifyEmail(token)
   doneCallback()
})

Template.emailValidation.helpers({
  waitingForValidation: function(){
    if(!Meteor.user()) return 
    return !Meteor.user().emails[0].verified
  }
})