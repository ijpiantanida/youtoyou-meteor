Template.latestVideos.onCreated(function(){
  this.subscribe("all-videos")
})

Template.latestVideos.helpers({
  videos: function(){
    return Videos.find({},{limit: 10, sort: {createdAt: -1}})
  }
})

Template.video.onCreated(function(){
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
  }
})