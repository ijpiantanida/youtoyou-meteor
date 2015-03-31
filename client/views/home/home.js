var dict = new ReactiveDict();
dict.setDefault("currentVideoId", null)
dict.setDefault("currentVideoData", null)
dict.setDefault("loading", false)
dict.setDefault("error", false)
dict.setDefault("currentVideoIsPublic", true)

function cleanCurrentVideo(){
  dict.set("loading", false)
  dict.set("currentVideoId", null)
  dict.set("currentVideoData", null)
  dict.set("error", false)
  dict.set("currentVideoIsPublic", true)
}

Template.home.onCreated(function(){
  this.autorun(function(){
    Meteor.userId()
    cleanCurrentVideo()
  })
})

Template.home.helpers({
  fullDownloadUrl: function(){
    var videoId = dict.get("currentVideoId")
    if(videoId){
      return Youtube.downloadLinkForVideoId(videoId)
    }else{
      return null
    }
  },
  currentVideo: function(){
    return dict.get("currentVideoData")
  },
  loadingCurrentVideo: function(){
    return dict.get("loading")
  },
  currentVideoError: function(){
    return dict.get("error")
  },
  downloadLinkClass: function(){
    if(dict.get("currentVideoId")){
      return "btn-success"
    }else{
      return "btn-default disabled"
    }
  },
  currentVideoIsPublic: function(){
    return dict.get("currentVideoIsPublic")
  }
})

function getVideoDetailsFunction(videoId){
  return function(){
    cleanCurrentVideo()
    if(!videoId) return

    dict.set("currentVideoId", videoId)
    dict.set("loading", true)
    Youtube.getVideoData(videoId, function(error, result){
      dict.set("loading", false)
      if(error){
        dict.set("error", true)
      }else{
        var videoDetails = result.data.entry
        dict.set("currentVideoData", {youtubeId: videoId, thumbnail: videoDetails.media$group.media$thumbnail[0].url, title: videoDetails.title.$t, duration: videoDetails.media$group.yt$duration.seconds})
      }
    })
  }
}

var timer
Template.home.events({
  "keyup .video-url": function(event){
    Meteor.clearTimeout(timer)

    var oldVideoId = dict.get("currentVideoId")
    var videoId = Youtube.getVideoIdFromString(event.target.value)

    if(videoId == oldVideoId) return
    if(oldVideoId == null){
      getVideoDetailsFunction(videoId)()
    }else{
      timer = Meteor.setTimeout(getVideoDetailsFunction(videoId), 700)
    }
  },
  "click .download-link": function(event){
    if(dict.get("currentVideoData")){
      var doc = dict.get("currentVideoData")
      doc.isPublic = dict.get("currentVideoIsPublic")
      doc.userId = Meteor.userId()

      Videos.insert(doc)
      cleanCurrentVideo()
      $(".video-url").val('')
    }
  },
  "click .public-icon": function(event){
    dict.set("currentVideoIsPublic", !dict.get("currentVideoIsPublic"))
  }
})

Tracker.autorun(function () {
  Meteor.subscribe("all-videos")
  publicUserId = _.uniq(_.compact(_.pluck(Videos.find({}, {fields: {userId: 1}}).fetch(), 'userId')))
  Meteor.subscribe("public-users", publicUserId);
});

Template.videoPreview.helpers({
  youtubeUrl: function(){
    return Youtube.youtubeUrlFor(this.youtubeId)
  },
  durationAsString: function(){
    var string = ""
    var remainingSeconds = this.duration
    if((remainingSeconds/60/60 | 0) > 0){
      string += (remainingSeconds/60/60 | 0) + "h "
      remainingSeconds -= (remainingSeconds/60/60 | 0) * 60 * 60
    }
    if((remainingSeconds/60 | 0) > 0){
      string += (remainingSeconds/60 | 0) + "m "
      remainingSeconds -= (remainingSeconds/60 | 0) * 60
    }
    if(remainingSeconds > 0){
      string += remainingSeconds + "s"
    }

    return string
  },
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

Template.latestVideos.helpers({
  videos: function(){
    return Videos.find({},{limit: 10, sort: {createdAt: -1}})
  }
})

Template.video.helpers({
  fullDownloadUrl: function(){
    if(this.youtubeId){
      return Youtube.downloadLinkForVideoId(this.youtubeId)
    }else{
      return null
    }
  }
})