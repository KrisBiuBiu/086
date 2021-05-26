let fn = {};

fn.sixRandom = () => {
    var num = '';
    for (var i = 0; i < 6; i++) {
        if(i == 0){
            num += Math.floor(Math.random() * 9 + 1);
        }else{
            num += Math.floor(Math.random() * 10);
        }
    };
    return num;
};

fn.getFileType = (file) => {
    var filename=file;
    var index1=filename.lastIndexOf(".");
    var index2=filename.length;
    var type=filename.substring(index1+1,index2);
    return type;
}

module.exports = fn;