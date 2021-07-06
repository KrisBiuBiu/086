const fs = require("fs");
const path = require("path");

let fn = {};

fn.mkDir = (realPath) => {
  let pathArr = realPath.split("\\");
  let dir = path.join(__dirname, `../`);
  for (var i in pathArr) {
    dir += "\\" + pathArr[i];
    let dirExists = fs.existsSync(dir);
    if (!dirExists) fs.mkdirSync(dir);
  }
  return dir;
}

fn.sixRandom = () => {
  var num = '';
  for (var i = 0; i < 6; i++) {
    if (i == 0) {
      num += Math.floor(Math.random() * 9 + 1);
    } else {
      num += Math.floor(Math.random() * 10);
    }
  };
  return num;
};

fn.getFileType = (file) => {
  var filename = file;
  var index1 = filename.lastIndexOf(".");
  var index2 = filename.length;
  var type = filename.substring(index1 + 1, index2);
  return type;
}


module.exports = fn;

