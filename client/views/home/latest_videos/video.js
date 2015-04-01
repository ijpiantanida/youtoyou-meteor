Template.video.onCreated(function(){
  this.dict = new ReactiveDict()
  this.dict.setDefault('comentsExpanded', false)
  this.dict.setDefault('currentCommentText', "")

  if(this.data._id){
    this.subscribe("likes", this.data._id)
  }
})

Template.video.helpers({
  fullDownloadUrl: function(){
    if(this.youtubeId){
      return Youtube.downloadLinkForVideoId(this.youtubeId)
    }else{
      return null
    }
  },
  likesCounter: function(){
    return this.likes().count()
  },
  likeByUser: function(){
    return Likes.likeByUser(Meteor.userId(), this._id)
  },
  isOwnVideo: function(){
    return Meteor.userId() && this.userId == Meteor.userId()
  },
  comentsExpanded: function(){
    return Template.instance().dict.get("comentsExpanded")
  },
  commentsCounter: function(){
    return this.comments().count()
  },
  currentCommentText: function(){
    return Template.instance().dict.get("currentCommentText")
  }
})

Template.video.events({
  'click .like-icon': function(){
    if(!Meteor.userId()){ return }
    var likeByUser = Likes.likeByUser(Meteor.userId(), this._id)
    if(likeByUser){
      Likes.remove(likeByUser._id)
    }else{
      Likes.insert({videoId: this._id, userId: Meteor.userId()})
    }
  },
  'click .video .public-icon': function(){
    Videos.update(this._id, {$set: {isPublic: !this.isPublic}})
  },
  'click .toggle-comments': function(){
    var dict = Template.instance().dict
    dict.set("comentsExpanded", !dict.get("comentsExpanded"))
  },
  'keyup .new-comment textarea': function(event){
    Template.instance().dict.set("currentCommentText", event.target.value)
  },
  'click .new-comment button': function(){
    var text = Template.instance().dict.get("currentCommentText")
    Comments.insert({userId: Meteor.userId(), videoId: this._id, text: text})
    Template.instance().dict.set("currentCommentText", "")
  }
})

Template.comment.onCreated(function(){
  if(this.data.userId){
    this.subscribe("public-users", this.data.userId)
  }
})

Template.comment.helpers({
  createdAt: function(){
    if(this.createdAt){
      return this.createdAt.toLocaleDateString() + " " + this.createdAt.toLocaleTimeString()
    }
  },
  username: function(){
    if(this.userId){
      user = Users.findOne(this.userId)
      if(user){
        return user.username  
      }
    }
  }
})