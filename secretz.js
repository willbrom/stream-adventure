const { pipeline } = require('node:stream')
const crypto = require('node:crypto')
const zlib = require('node:zlib')

const tar = require('tar')
const concat = require('concat-stream')
const through2 = require('through2')

const algo = process.argv[2]
const key = process.argv[3]
const iv = process.argv[4]

const decipherStream = crypto.createDecipheriv(algo, key, iv)

const parser = new tar.Parse()
parser.on('entry', e => {
    if (e.type !== 'File') return

    const hash_stream = crypto.createHash('md5', { encoding: 'hex' })
    e.pipe(hash_stream)
    .pipe(concat(function (c) {
        console.log(`${c} ${e.path}`)
    }))
}) 

pipeline([process.stdin, decipherStream, zlib.createGunzip(), parser], err => {
    if (err) {
        console.err(err)
        process.exit(1)
    }
})