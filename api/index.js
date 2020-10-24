var app = require('./server')();

app.listen(app.get('port'), function(){
     console.log(`Express on port ${app.get('port')}`); 
}); 