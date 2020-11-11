const express = require('express')

const os = require('os')
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


const spliter=os.platform()==='linux'?'/':'\\'
function readFileList(dir, tree=[]) {
    const files = fs.readdirSync(dir);
    // console.log(files);
    files.forEach((item, index) => {
        var node={}
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        node.key = fullPath;
        const title = fullPath.split(spliter).slice(-1)[0];
        node.title = title;
        if (stat.isDirectory()) {
            // dirsList.push(fullPath)
            // readFileList(path.join(dir, item), filesList);  //递归读取文件
            node.children = readFileList(path.join(dir, item));
            if(!node.children.length) return;
        } else {  
          if(title.indexOf('md') == -1) return;              
            // filesList.push(fullPath);                  
        }        
        tree.push(node)
    });
    return tree
}

var tree=[]
readFileList(path.join(__dirname, '../mdDocs'),tree);
// console.log(filesList);

const router = express.Router()
router.get('/',(req,res,next)=>{
  console.log(os.platform())
  res.json({
    code:200,
    tree
  })
})

module.exports = router