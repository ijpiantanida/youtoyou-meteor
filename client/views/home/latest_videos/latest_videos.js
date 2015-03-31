Template.latestVideos.onCreated(function(){
  this.subscribe("all-videos")
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