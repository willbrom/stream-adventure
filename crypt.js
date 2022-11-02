const { createDecipheriv } = require('node:crypto')

const pass_phrase = process.argv[2]
const iv = process.argv[3]
const algo = 'aes256'

const decipher = createDecipheriv(algo, pass_phrase, iv)

process.stdin.pipe(decipher).pipe(process.stdout)