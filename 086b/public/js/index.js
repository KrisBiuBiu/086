function postLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if(!username) return alert("请输入用户名");
  if(!password) return alert("请输入密码");
  var post = {
    "username": username,
    "password": password
  }
  console.log(post)
  // $.ajax({
	// 	url: '/login',
	// 	type: 'POST',
	// 	data: post,
	// 	processData: false,
	// })
	// 	.success(function(data) {
  //     console.log("成功")
  //     console.log(data)
	// 	})
	// 	.error(function(data) {
  //     console.log("失败")
	// 		console.log(data)
  // 	})
  $.post('/login', { username: username, password: password }, function (data) {
    if (data.success) {
        // 登录成功
        document.location.href = "/backstage";
    } else {
        // 登录失败，弹出失败信息。
        alert(data.msg); 
    }
});
}

function uploadImage() {
  var file = $("#fileInput")[0].files[0];
  if(!file) {
    alert("未选择任何文件");
    return;
  }
  var formData = new FormData();
  formData.append("file", file);
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(e) {
  }
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300){
        alert("上传成功");
        document.location.reload();
      }
    }
  }
  xhr.onerror = function(e) {
    screenTopWarning("网络错误，上传中断，请重试");
    media.netWord = false;
  };
  xhr.open("POST", '/backstage/imgUpload', true);
  xhr.send(formData);
}

function insertImg(para) {
  var sid = $(para).attr("sid");
  var codeResource;
  if(sid === "image") {
    codeResource = "<p><img src='"+$(para).attr("src")+"' style='max-width:100%'></p>"
  }else{
    codeResource = "<p><video src='"+$(para).attr("src")+"' style='max-width:100%' controls='controls'></video></p>"
  }
  ue.execCommand('inserthtml', codeResource);
}

function postEditNew() {
  var nid = $("#newId").attr("nid");
  var title = $("#input01").val();
  var time = $("#input02").val();
  var description = $("#input03").val();
  if(!title || !time) {
    alert("请填写标题和时间")
    return;
  }
  var content = ue.getContent();
  if(!content) {
    alert("请填写内容");
    return;
  }
  // 获取封面图
  // var imgArray = content.match(/\<img.*?src=\"(.*?)\".*?\>/igm);
  // console.log(imgArray)
  // if(imgArray && imgArray.length > 0) {
  //   var frame = imgArray[0].replace(/\<img.*?src=\"(.*?)\".*?\>/igm, "$1");
  // }
  // console.log(frame)
  var frame = $("#frame").attr("dataid")
  var post = {
    title: title,
    time: time,
    content: content,
    description: description,
    frame: frame,
    nid: nid
  }
  $.post('/backstage/news/edit', post, function (data) {
    alert(data.msg); 
    window.location.href = "/backstage/news"
  });
}

function postNew(){
  var title = $("#input01").val();
  var time = $("#input02").val();
  var description = $("#input03").val();
  if(!title || !time) {
    alert("请填写标题和时间")
    return;
  }
  var content = ue.getContent();
  if(!content) {
    alert("请填写内容");
    return;
  }
  // 获取封面图
  // var imgArray = content.match(/\<img.*?src=\"(.*?)\".*?\>/igm);
  // if(imgArray && imgArray.length > 0) {
  //   var frame = imgArray[0].replace(/\<img.*?src=\"(.*?)\".*?\>/igm, "$1");
  // }
  var frame = $("#frame").attr("dataid");
  var post = {
    title: title,
    time: time,
    content: content,
    description: description,
    frame: frame
  }
  $.post('/backstage/news', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}

function delNews(para){
  var id = $(para).attr("id");
  var post = {
    id: id
  } 
  $.post('/backstage/news/del', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}

function editNews(para) {
  var id = $(para).attr("id");
  var post = {
    id: id
  }
  var href = "/backstage/news/edit?newid=" + id;
  window.location.href = href;
}

function postContact() {
  var position = $("#input01").val();
  var name = $("#input02").val();
  var mobile = $("#input03").val();
  var email = $("#input04").val();
  var post = {
    position: position,
    name: name,
    mobile: mobile,
    email: email
  }
  
  $.post('/backstage/contact', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}

function delContact(para){
  var id = $(para).attr("id");
  var post = {
    id: id
  } 

  $.post('/backstage/contact/del', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}

function editContact(para) {
  var id = $(para).attr("id");
  var post = {id: id};
  $.post('/backstage/contact/edit', post, function(data) {
    var contact = data.contact;
    $("#editPosition").val(contact.position);
    $("#editName").val(contact.name);
    $("#editMobile").val(contact.mobile);
    $("#editEmail").val(contact.email)
    $("#edit-file").removeClass("hidden");
    $("#editButton").attr("dataid", id)
  })
}

function postEditContact(para) {
  var position = $("#editPosition").val();
  var name = $("#editName").val();
  var mobile = $("#editMobile").val();
  var email = $("#editEmail").val();
  var id = $(para).attr("dataid")
  var post = {
    position: position,
    name: name,
    mobile: mobile,
    email: email,
    id: id
  }
  $.post("/backstage/contact/editpost", post, function(data) {
    alert(data.msg); 
    document.location.reload();
  })
}

function editService(type) {
  var title = $("#input01").val();
  var content = ue.getContent();
  if(!title) {
    alert("请填写标题");
  }
  var post = {
    type: type,
    title: title,
    content: content
  }
  $.post('/backstage/service', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}
function editEvent(type) {
  var title = $("#input01").val();
  var content = ue.getContent();
  if(!title) {
    alert("请填写标题");
  }
  var post = {
    type: type,
    title: title,
    content: content
  }
  $.post('/backstage/event', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  }); 
}

function postDay() {
  var dayArray = [];
  $("#dayTable").find("tbody").find("tr").each(function() {
    var daySingle = {};
    var date = $(this).find(".date").text();
    var content = $(this).find(".content").val();
    daySingle.date = date.replace(/(^\s*)|(\s*$)/g,"");
    daySingle.content = content.replace(/(^\s*)|(\s*$)/g,"");
    dayArray.push(daySingle);
  })
  var post = {
    dayArray: dayArray
  }
  $.post('/backstage/day', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  }); 
}

function homeSave() {

}

function serviceUploadImg(para) {
  var file = $(para).parents("tr").find("#imgFile")[0].files[0];
  if(!file) {
    alert("未选择任何文件");
    return;
  }
  var formData = new FormData();
  formData.append("file", file);
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(e) {
  }
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300){
        var resb = JSON.parse(e.target.response);
        var imgSrc = "/upload/"+resb.id + "."+resb.ext;
        $(para).parents("tr").find(".serImg").attr("src", imgSrc)
        $(para).parents("tr").find(".serImg").attr("sid", resb.id+"."+resb.ext)
        alert("上传成功");
        // document.location.reload();
      }
    }
  }
  xhr.onerror = function(e) {
    screenTopWarning("网络错误，上传中断，请重试");
    media.netWord = false;
  };
  xhr.open("POST", '/backstage/imgUpload', true);
  xhr.send(formData);
}

function middleUploadImg(para) {
  var file = $(para).parents("tr").find("#imgFile")[0].files[0];
  if(!file) {
    alert("未选择任何文件");
    return;
  }
  var formData = new FormData();
  formData.append("file", file);
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(e) {
  }
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300){
        var resb = JSON.parse(e.target.response);
        var imgSrc = "/upload/"+resb.id + "."+resb.ext;
        $(para).parents("tr").find(".midImg").attr("src", imgSrc)
        $(para).parents("tr").find(".midImg").attr("sid", resb.id+"."+resb.ext)
        alert("上传成功");
      }
    }
  }
  xhr.onerror = function(e) {
    screenTopWarning("网络错误，上传中断，请重试");
    media.netWord = false;
  };
  xhr.open("POST", '/backstage/imgUpload', true);
  xhr.send(formData);
}

function kehuUploadImg(para) {
  var file = $(para).parents("tr").find("#imgFile")[0].files[0];
  if(!file) {
    alert("未选择任何文件");
    return;
  }
  var formData = new FormData();
  formData.append("file", file);
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(e) {
  }
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300){
        var resb = JSON.parse(e.target.response);
        var imgSrc = "/upload/"+resb.id + "."+resb.ext;
        $(para).parents("tr").find(".kehuImg").attr("src", imgSrc)
        $(para).parents("tr").find(".kehuImg").attr("sid", resb.id+"."+resb.ext)
        alert("上传成功");
      }
    }
  }
  xhr.onerror = function(e) {
    screenTopWarning("网络错误，上传中断，请重试");
    media.netWord = false;
  };
  xhr.open("POST", '/backstage/imgUpload', true);
  xhr.send(formData);
}

// 设置保存
function saveHome(){
  // firstIntro
  var firstTitle = $("#firstTitle").val();
  var firstCnCon = $("#firstCnCon").val();
  var firstEnCon = $("#firstEnCon").val();
  // our ser
  var serEasyTitle = $("#serEasyTitle").val();
  var serNameOne = $("#serNameOne").val();
  var serTextOne = $("#serTextOne").val();
  var serNameTwo = $("#serNameTwo").val();
  var serTextTwo = $("#serTextTwo").val();
  var serNameThr = $("#serNameThr").val();
  var serTextThr = $("#serTextThr").val();
  // mid
  var midLeftImg = $("#midLeftImg").attr("sid");
  var midRightTitle = $("#midRightTitle").val();
  var midRightConOne = $("#midRightConOne").val();
  var midRightConTwo = $("#midRightConTwo").val();
  // gro
  var groTitle = $("#groTitle").val();
  var groImgArr = [];
  $("#groImgArr").find(".serImg").each(function() {
    groImgArr.push($(this).attr("sid"));
  })
  // kehu
  var kehuTitle = $("#kehuTitle").val();
  var kehuImgArr = [];
  $("#kehuImgArr").find(".kehuImg").each(function() {
    kehuImgArr.push($(this).attr("sid"));
  })
  var post = {
    firstTitle : firstTitle,
    firstCnCon : firstCnCon,
    firstEnCon : firstEnCon,
    serEasyTitle : serEasyTitle,
    serNameOne : serNameOne,
    serTextOne : serTextOne,
    serNameTwo : serNameTwo,
    serTextTwo : serTextTwo,
    serNameThr : serNameThr,
    serTextThr : serTextThr,
    midLeftImg : midLeftImg,
    midRightTitle : midRightTitle,
    midRightConOne : midRightConOne,
    midRightConTwo : midRightConTwo,
    groTitle : groTitle,
    groImgArr : groImgArr,
    kehuTitle : kehuTitle,
    kehuImgArr : kehuImgArr,
  }
  $.post('/backstage/home', post, function (data) {
    alert(data.msg); 
    document.location.reload();
  });
}

function uploadFrame(para) {
  var file = $("#fileInput")[0].files[0];
  if(!file) {
    alert("未选择任何文件");
    return;
  }
  var formData = new FormData();
  formData.append("file", file);
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function(e) {
  }
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300){
        var res = JSON.parse(xhr.response)
        $("#frame").attr("dataid", "/upload/"+res.id+"."+res.ext)
        alert("上传成功");
      }
    }
  }
  xhr.onerror = function(e) {
    screenTopWarning("网络错误，上传中断，请重新上传");
  };
  xhr.open("POST", '/backstage/imgUpload', true);
  xhr.send(formData);
}