const { Readable } = require('stream')

const my_stream = new Readable()
my_stream._read = function (size) {}

my_stream.push(process.argv[2])
my_stream.pipe(process.stdout)