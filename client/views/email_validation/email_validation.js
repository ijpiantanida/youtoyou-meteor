var dict = new ReactiveDict()
dict.setDefault('isLoading', false)

Schemas.ChangeEmailForm = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
})

Schemas.ChangeEmailForm.messages({
  'regEx': 'You have invalid characters in your [label]',
  'notUnique': 'The [label] you provided is already registered'
});

Accounts.onEmailVerificationLink(function(token, doneCallback){
   Accounts.verifyEmail(token)
   doneCallback()
})

Template.emailValidation.helpers({
  email: function(){
    return Meteor.user().emailAddress()
  },
  isLoading: function () {
    return dict.get('isLoading')
  },
  fieldErrors: function () {
    var context = Schemas.ChangeEmailForm.namedContext('ChangeEmailForm')
    return _.reduce(context.invalidKeys(), function (memo, errObj) {
      memo.push(context.keyErrorMessage(errObj.name))
      return memo
    }, [])
  }
})

Template.emailValidation.events({
  'click .s2end-email-button': function(){
    dict.set('isLoading', true)
    $email = $("input[type='email']")
    Meteor.call("user/changeEmail", $email.val(), function(error){
      dict.set('isLoading', false)
      if(error){

      }
    })
  }
})

AutoForm.hooks({
  ChangeEmailForm: {
    beginSubmit: function () {
      dict.set('isLoading', true)
    },
    onSuccess: function (operation, result, template){
      dict.set('isLoading', false)
    },
    onError: function (operation, error, template){
      dict.set('isLoading', false)
      if (error.error === 'field-validation') {
        this.validationContext.addInvalidKeys(error.details)
      }
    }
  }
});
