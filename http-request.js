const http = require('http')
const through = require('through2')

http.createServer((req, res) => {
    if (req.method === 'GET') return res.end('beep boop\n')
    req.pipe(through(function (chunk, enc, next) {
        this.push(chunk.toString().toUpperCase())
        next()
    })).pipe(res)
}).listen(process.argv[2])