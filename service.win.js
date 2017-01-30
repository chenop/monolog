var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Monolog server',
  description: 'Node.js server app for Monolog',
  script: require('path').join('D:\\polls\\iis_files\\tqs\\monolog', 'server.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});


// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!\nVisit http://127.0.0.1:3000 to see it in action.');
});


svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
//svc.uninstall();


svc.install();