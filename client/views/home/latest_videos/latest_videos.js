Template.latestVideos.onCreated(function(){
  this.subscribe("all-videos")
})

Template.latestVideos.helpers({
  videos: function(){
    return Videos.find({},{limit: 10, sort: {createdAt: -1}})
  }
})
