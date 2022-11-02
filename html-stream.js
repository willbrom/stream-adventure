const { pipeline } = require('node:stream')

const through = require('through2')
const trumpet = require('trumpet')()

const to_upper = through(function (chunk, _, next) {
    this.push(chunk.toString().toUpperCase())
    next()
}, (next) => {
    next()
})

const tr_stream = trumpet.select('.loud').createStream()
tr_stream.pipe(to_upper).pipe(tr_stream)

pipeline([process.stdin, trumpet, process.stdout], (err) => process.stdout.end(err))
