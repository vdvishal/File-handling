const readline = require('readline');
const fs = require('fs')
const { Readable } = require('stream');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter directory name-', (answer) => {
    let dirName = answer;
    fs.readdir(`${answer}`,(err,file)=> {
        if(err){
            console.log(err);
        }
        else if (file.length===0) {
            console.log("No file present");
        }
        else {
            let dir = file;
            for(let i=0;i < dir.length;i++) {
                console.log(i+1,dir[i]); 
            }
            next(dirName,dir)
        }
    })
});

let next = (dir,data) => {
    rl.question('Enter serial no. of file to copy:', (num) => {
        var rr = fs.createReadStream(dir+'/' + data[num-1],'utf8');
        rl.question('Enter destination folder:', (ans) => {
            var ww = fs.createWriteStream(ans+'/' + data[num-1],'utf8');
            rr.pipe(ww);
            console.log("success");
            rl.close();
        })
        
     })
     
}
