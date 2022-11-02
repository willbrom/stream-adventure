const http = require('http')

const req = http.request('http://localhost:8099', {method: 'POST'}, (res) => {
    res.pipe(process.stdout)
})
req.on('error', err => console.log(`Error: ${err.message}`))

process.stdin.pipe(req)