const http = require('http');
const fs   = require('fs');
const path = require('path');

const readDir = (path) => new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
        if (err) {
            reject(err)
        } else {
            resolve(files);
        }
    })
})

http.createServer( (req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'public', file);
    const extname = path.extname(filePath);

    const allowedFileTypes = ['.html', '.css', '.js'];
    const allowed = allowedFileTypes.find((item) => item === extname)

    // Trata arquivos que sejam diferente das extensões 
    // que estão no allowedFileTypes
    if (!allowed) return


    fs.readFile(
        filePath,
        (err, content) => {
            if (err) throw err;
            res.end(content);
        }
    )
 
}).listen(5000, ()=> {
    console.log('Server is running');
})