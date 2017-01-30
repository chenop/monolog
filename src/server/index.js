var Client = require('ssh2').Client;
var http = require('http');
var app = http.createServer(function(req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
});

var io = require('socket.io').listen(app);
var conn = new Client();

var execStr = 'tail -f '; ///TQS/tqs.log
var tailStream;
var kbInteractivePw;

conn
  .on('ready', onConnectionReady)
  .on('keyboard-interactive', onKeyboardInteractive)
  //.connect(connectionSettings());

app.listen(7000);

io.on('connection', function(socket) {

  socket.on('login', function(credentials) {
    console.info('Client :: login');
    console.log(credentials);
    try {
      conn.on('error', function(e) {
        /* do whatever */
        console.log('error');
      });
      conn.connect(connectionSettings(credentials));
    } catch(ex) {
      console.log('ERRRRRRRRRRRR');
    }

  });

  socket.on('logout', function() {
    console.info('Client :: logout');
    conn.connect(connectionSettings(credentials));
  });

});

function onConnectionReady(socket) {
   console.info('Client :: ready');
   conn.exec(execStr, onTail);
}

function onTail(err, stream) {

  console.info('Client :: onTail');
  if (err) throw err;

  tailStream = stream;

  stream.on('exit', function(code, signal) {
    console.info('Client :: exit');
    conn.end();
  });

  stream.on('close', function(code, signal) {

    console.info('Stream :: close :: code: ' + code + ', signal: ' + signal);
    conn.end();

  }).on('data', function(data) {

    io.emit('log', data);

  }).stderr.on('data', function(data) {
    console.info('STDERR: ' + data);
  });
}

function onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
		console.log('kb: '+ kbInteractivePw);
		finish([kbInteractivePw]);
}

function connectionSettings(credentials) {
  execStr = execStr + credentials.path;
  kbInteractivePw = credentials.password;
  return {
    host: credentials.host,//'10.0.128.156',
    port: credentials.port,//22
    username: credentials.username,
  	password: credentials.password,
  	tryKeyboard: true,
  	//debug: console.log
  };
}
