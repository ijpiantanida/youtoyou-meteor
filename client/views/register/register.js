var dict = new ReactiveDict()

dict.setDefault('isLoading', false)

Schemas.SignUpForm = new SimpleSchema({
  username: Schemas.Mixins.username,
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
    type: String,
    min: 6
  },
  passwordConfirmation: {
    type: String,
    min: 6,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return "passwordMismatch"
      }
    }
  }
});

Schemas.SignUpForm.messages({
  'notUnique': 'The [label] you provided is already registered',
  'regEx': 'You have invalid characters in your [label]',
  'passwordMismatch': "Passwords dont't match"
});

Template.register.helpers({
  isLoading: function () {
    return dict.get('isLoading')
  },
  fieldErrors: function () {
    var context = Schemas.SignUpForm.namedContext('SignUpForm')
    return _.reduce(context.invalidKeys(), function (memo, errObj) {
      memo.push(context.keyErrorMessage(errObj.name))
      return memo
    }, [])
  }
});

AutoForm.hooks({
  SignUpForm: {
    beginSubmit: function () {
      dict.set('isLoading', true)
    },
    onSuccess: function (operation, result, template) {
      Meteor.loginWithPassword(result.username, result.password, function (error) {
        dict.set('isLoading', false)
        if(!error){
          Router.go('home')
        }else{

        }
      })     
    },
    onError: function (operation, error, template) {
      dict.set('isLoading', false)
      var context = Schemas.SignUpForm.namedContext('SignUpForm');
      if (error.error === 'field-validation') {
        context.addInvalidKeys(error.details)
      }
    }
  }
});
