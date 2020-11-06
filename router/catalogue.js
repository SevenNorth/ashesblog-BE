const express = require('express')

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

function readFileList(dir, tree=[]) {
    const files = fs.readdirSync(dir);
    // console.log(files);
    files.forEach((item, index) => {
        var node={}
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        node.key=fullPath
        node.title=fullPath.split('\\').slice(-1)[0]
        if (stat.isDirectory()) {
            // dirsList.push(fullPath)
            // readFileList(path.join(dir, item), filesList);  //递归读取文件
            node.children = readFileList( path.join(dir, item))
        } else {                
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
  res.json({
    code:200,
    tree
  })
})

module.exports = router