var dict = new ReactiveDict()

dict.setDefault('isLoading', false)

Schemas.SignInForm = new SimpleSchema({
  username: Schemas.Mixins.username,
  password: {
    type: String
  }
});

Schemas.SignInForm.messages({
  'regEx': 'You have invalid characters in your [label]',
  'failedSignIn': 'Invalid username or password'
});

Template.signIn.helpers({
  isLoading: function () {
    return dict.get('isLoading')
  },
  fieldErrors: function () {
    var context = Schemas.SignInForm.namedContext('SignInForm')
    return _.reduce(context.invalidKeys(), function (memo, errObj) {
      memo.push(context.keyErrorMessage(errObj.name))
      return memo
    }, [])
  }
});

AutoForm.hooks({
  SignInForm: {
    onSubmit: function (doc) {
      dict.set('isLoading', true)
      var form = this
      Meteor.loginWithPassword(doc.username, doc.password, function (error) {
        dict.set('isLoading', false)
        form.done(error)
      })     
      return false
    },
    onSuccess: function (operation, result, template){
      Router.go('home')
    },
    onError: function (operation, error, template){
      var context = Schemas.SignInForm.namedContext('SignInForm');
      context.addInvalidKeys([{name: 'username', type: 'failedSignIn'}])
    }
  }
});
