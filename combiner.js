const combine = require('stream-combiner')
const split2 = require('split2')
const through2 = require('through2')
const zlib = require('zlib')

module.exports = function () {
    return combine(
        split2(),
        through2({ objectMode: true }, function (obj, _, done) {
            obj = JSON.parse(obj)

            if (this.library && obj.type === 'genre') {
                this.push(JSON.stringify(this.library))
                this.library = undefined
            }
            
            this.library ??= {}
            
            obj.type === 'genre' ? 
            (this.library.name = obj.name) :
            (
                (this.library.books ??= []) && 
                this.library.books.push(obj.name)
            )

            done()
        }, function (done) {
            done()
        }),
        zlib.createGzip())
}