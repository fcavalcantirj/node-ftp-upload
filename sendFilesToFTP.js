var fs=require('fs');
var Client = require('ftp');
var dir = require('node-dir');

var data=[];
var c = new Client();

dir.readFiles('/Users/fcavalcanti/Desktop/betapostcrawler/', {
    match: /.txt$/,
    exclude: /^\./
    }, function(err, content, next) {
        if (err) throw err;
        data.push(content);
        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('finished reading files:',files);
    });

  c.on('ready', function() {
    data.forEach(function(entry) {
        console.log(entry);
        c.put(entry, '/public_html/projeto_mdp_des/teste/'+entry, function(err) {
          if (err) throw err;
          c.end();
        });
    });
  });
  c.connect({ host: 'HOST', user: 'USER', password: 'PASS' });