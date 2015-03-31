Meteor.methods({
  'user/changeEmail': function (doc) {
    this.unblock()

    check(doc.email, String)

    if(Meteor.user().emailAddress() != doc.email){
      var fieldErrors = [];
      if (Meteor.users.findOne({ 'emails.address': doc.email })){
        fieldErrors.push({ name: 'email', type: 'notUnique' });
      }

      if (fieldErrors.length > 0) {
        throw new Meteor.Error('field-validation', 'One or more fields failed server side validation', fieldErrors);
      }

      Users.update(this.userId, {$set: {"emails.0.address": doc.email, "emails.0.verified": false}})
    }
    
    Accounts.sendVerificationEmail(this.userId)
    return true
  }
})