const ws = require('ws')
const my_ws = new ws.WebSocket('ws://localhost:8099')
const ws_stream = ws.createWebSocketStream(my_ws)

ws_stream.write('hello\n')
ws_stream.pipe(process.stdout)