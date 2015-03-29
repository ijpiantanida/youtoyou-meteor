Youtube = {
  getVideoData: function(videoId, callback){
    console.log("Starting Youtube request for video " + videoId)
    Meteor.http.get('https://gdata.youtube.com/feeds/api/videos/'+videoId+'?v=2&alt=json', callback)
  },
  getVideoIdFromString: function(string){
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = string.match(regExp)
    if (match && match[2].length == 11) {
      return match[2]
    } else {
      return string
    }
  },
  youtubeUrlFor: function(videoId){
    return "https://www.youtube.com/watch?v=" + videoId
  },
  downloadLinkForVideoId: function(videoId){
    return "https://youtoyou.herokuapp.com?url=" + this.youtubeUrlFor(videoId)
  }
}