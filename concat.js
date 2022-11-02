const concat = require('concat-stream')

let data = []
process.stdin.on('data', (chunk) => {
    data.push(chunk.toString())
})

process.stdin.on('end', () => {
    process.stdout.write(data.join('\n'))
})