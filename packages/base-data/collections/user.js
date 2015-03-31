Users = Meteor.users

Users.helpers({
  emailAddress: function () {
    return this.emails[0].address
  }
})