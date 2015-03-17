var fs=require('fs');
var Client = require('ftp');
var dir = require('node-dir');

var data=[];
var fileNames = [];
var c = new Client();
var counter = 0;

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
        console.log('finished reading files: ',files.length);
        fileNames = files;
    });

  c.on('ready', function() {
    data.forEach(function(entry) {
      console.log(fileNames[counter].split("/")[5]);
        c.put(entry, '/public_html/projeto_mdp_des/teste/'+fileNames[counter].split("/")[5], function(err) {
          if (err) throw err;
          c.end();
        });
        counter = counter +1;
    });
  });
  c.connect({ host: 'HOST', user: 'USER', password: 'PASS' });