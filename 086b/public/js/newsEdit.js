$(document).ready(function() {
  var content = $("#hiddenContent").text();
  ue.ready(function(){ 
    ue.setContent(JSON.parse(content));
  })
})