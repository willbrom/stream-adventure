const { spawn } = require('node:child_process')
const duplexer = require('duplexer2')

function func(cmd, args) {
    const c_process = spawn(cmd, args)
    return duplexer(c_process.stdin, c_process.stdout)
}

module.exports = func