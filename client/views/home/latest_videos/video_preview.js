Template.videoPreview.onCreated(function(){
  if(this.data.userId){
    this.subscribe("public-users", this.data.userId)
  }
})

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