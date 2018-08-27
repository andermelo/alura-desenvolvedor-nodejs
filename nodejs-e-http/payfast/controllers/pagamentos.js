
module.exports = function (app) {
    app.get('/pagamentos', function(req, res){
        console.log('Recebida requisição de teste na por 3030.')
        res.send('OK.');
    });

    app.post('/pagamentos/pagamento', function(req, res){

        req.assert("forma_de_pagamento", "Forma de pagamento eh obrigatorio").notEmpty();
        req.assert("valor", "Valor eh obrigatorio e deve ser um decimal").notEmpty().isFloat();
        req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);

        var erros = req.validationErrors();

        if(erros){
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body;
        console.log('processando uma requisicao de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado){
            if(erro){
                console.log('erro ao inserir no banco: ' + erro);
                res.status(500).send(erro);
            }else{
                console.log('pagameno criado' + resultado);
                res.location('/pagamentos/pagamento/' + resultado.insertId);

                res.status(201).json(pagamento);
            }
        });

    });
}