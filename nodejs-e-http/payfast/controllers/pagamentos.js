
module.exports = function (app) {
    app.get('/pagamentos', function(req, res){
        console.log('Recebida requisição de teste na por 3030.')
        res.send('OK.');
    });
}