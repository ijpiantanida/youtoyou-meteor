DownloadController = ApplicationController.extend({
  download: function(){
    if(Meteor.isServer){
      var request = Meteor.npmRequire("request");
      request("https://youtoyou.herokuapp.com/?url=https://www.youtube.com/watch?v=THHR-Rc-49Y").pipe(this.response);
    }
  }
});