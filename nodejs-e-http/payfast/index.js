var app = require('./config/custom-express')();

app.listen(3030, function(){
    console.log('servidor rodando na porta 3030');
});

