const duplexer2 = require("duplexer2")
const through2 = require("through2")

/**
 * return a duplex stream to count countries on the writable side
 * and pass through `counter` on the readable side
 */
module.exports = function (counter) {
  const transform = through2({ objectMode: true }, (obj, _, done) => {
    this.countries = this.countries ?? {};
    this.countries[obj.country] = (this.countries[obj.country] || 0) + 1
    done();
  }, (done) => {
    counter.setCounts(this.countries)
    done()
  })

  return duplexer2({ objectMode: true }, transform, counter)
}
