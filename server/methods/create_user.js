Meteor.methods({
  'register/signUp': function (doc) {
    var fieldErrors = [];
    
    if (Meteor.users.findOne({username: doc.username})){
      fieldErrors.push({ name: 'username', type: 'notUnique' });
    }
    if (Meteor.users.findOne({ 'emails.address': doc.email })){
      fieldErrors.push({ name: 'email', type: 'notUnique' });
    }

    if (fieldErrors.length > 0) {
      throw new Meteor.Error('field-validation', 'One or more fields failed server side validation', fieldErrors);
    }

    var newUserId = Accounts.createUser(doc)
    Accounts.sendVerificationEmail(newUserId)
    this.setUserId(newUserId)
    return {userId: newUserId, username: doc.username, password: doc.password}
  }
})