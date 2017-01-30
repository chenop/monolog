const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Client = require('ssh2').Client;

const PORT = 3000; //process.env.PORT || 3000;
var clients = {};
var tailCommand = 'tail -f ';
var execStr = '';
var kbInteractivePw;

const router = express.Router()
  .get('/', function(req, res) {
    res.render('./index.html');
  });

const app = express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .engine('html', require('ejs').renderFile)
  .use(express.static(__dirname + '/build'))
  .use('', router);

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(PORT, function() {
  console.log('Listening on '+ PORT);
});

io.on('connection', function(socket) {

    socket.on('login', function(credentials) {
      console.info('Client :: login');
      try {
        var conn = new Client();
        conn
          .on('ready', function() {
            onConnectionReady(credentials);
          })
          .on('keyboard-interactive', onKeyboardInteractive)
          .on('error', function(e) {
            console.log('Conn :: emitting login error: ' + e);
            io.emit('login_error_' + credentials.sessionId, e);
          })
          .connect(connectionSettings(credentials));
        clients[credentials.sessionId] = conn;

        socket.on('disconnect', function() {

          if (clients[credentials.sessionId]) {
            clients[credentials.sessionId].end();
            console.info('Client :: disconnecting sessionId: ' + credentials.sessionId);
          }
        });

      } catch(ex) {
        console.log('Error');
      }

    });
  });

function onConnectionReady(credentials) {
     console.info('Client :: ready');
     console.info(credentials);

     clients[credentials.sessionId].exec(tailCommand + execStr, function(err, stream){
       onTail(credentials.sessionId, err, stream)
     });

     io.emit('log_ready_' + credentials.sessionId);
  }

function onTail(sessionId, err, stream) {

    console.info('Client :: onTail');
    if (err) throw err;

    stream.on('exit', function(code, signal) {
      console.info('Client :: exit');
      clients[sessionId].end();
    });

    stream.on('close', function(code, signal) {
      console.info('Stream :: close :: code: ' + code + ', signal: ' + signal);
      clients[sessionId].end();

    }).on('data', function(data) {

      io.emit('log_' + sessionId , data);

    }).stderr.on('data', function(data) {
      console.info('STDERR (emitting log_error) :: ' + data);
      io.emit('log_error_' +sessionId , data);
    });
  }

function onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
  		console.log('kb: '+ kbInteractivePw);
  		finish([kbInteractivePw]);
  }

function connectionSettings(credentials) {
    execStr = credentials.path;
    kbInteractivePw = credentials.password;
    return {
      //readyTimeout: 99999,
      host: credentials.host,//'10.0.128.156',
      port: credentials.port,//22
      username: credentials.username,
    	password: credentials.password,
    	tryKeyboard: true,
    	//debug: console.log
    };
  }
