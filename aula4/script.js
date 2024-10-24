$(document).ready(function() {
    // Variável global "resposta" que armazena
    // a resposta JSON da consulta do CEP
    // digitado pelo usuário.
    let resposta = false;

    $("input[name=cep]").mask("00000-000");
    $("input[name=numero]").mask("n",{
        translation: {
            'n':{
                pattern: /[0-9]/,
                recursive: true
            }
        }
    });

    $("input[name=telefone]").mask("(00) 00000-0000");
    $('input[name=telefone]').on('keyup',function(){   
        let telefone = $("input[name=telefone]").val();
        // Remove todos os caracteres que não são números.
        telefone = telefone.replace(/[\D]/g,'');

        if (telefone.length < 11) {
            mascara = '(00) 0000-00000';
        } else {
            mascara = '(00) 00000-0000';
        }

        $("input[name=telefone]").mask(mascara);
    });    

    const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    // Carregar os estados na inicialização
    $.getJSON(urlEstados, function(data) {
        data.forEach(function(estado) {
            $('#estado').append(`<option value="${estado.sigla}">${estado.nome}</option>`);

        });
    });

    $("form").on("submit", function(event){
        $("form input").prop("disabled", false);
        $("form select").prop("disabled", false);
    });

    $("input[name=cep]").on("keyup", function(event){
        let cep = $("input[name=cep]").val();
        cep = cep.replace("-", "");
        if(cep.length == 8){
            $("input[name=cep]").removeClass("is-invalid");
            //alert(cep);
            $.ajax({url: "https://viacep.com.br/ws/"+ cep +"/json", dataType: "text"})
            .done(function(data){
                resposta = JSON.parse(data);
                if(resposta.erro){
                    $("input[name=cep]").addClass("is-invalid");
                }else{
                    $("input[name=rua]").val(resposta.logradouro);
                    // Desabilita o campo "Rua" caso o CEP retorne um
                    // nome de rua.
                    if(resposta.logradouro !== "") {
                        $("input[name=rua]").prop("disabled", "disabled");
                    }
                    if(resposta.bairro !== "") {
                        $("input[name=bairro]").prop("disabled", "disabled");
                    }
                    $("input[name=bairro]").val(resposta.bairro);
                    $("select[name=estado]").val(resposta.uf);
                    $("select[name=estado]").trigger("change");
                    $("input[name=complemento]").val(resposta.complemento);
                    // Bloqueia os campos do Estado e Cidade para que a pessoa
                    // não possa alterá-los, já que o CEP determina o Estado e a
                    // Cidade que a pessoa mora.
                    $("select[name=estado]").prop("disabled", "disabled");
                    $("select[name=cidade]").prop("disabled", "disabled");
                }
            })
            .fail(function(data) {
                resposta = { "erro": "true" }
            });

        } else {
            // Se o CEP tiver menos do que 8 dígitos,
            // desbloqueia e limpa os campos.
            $("input[name=rua]").prop("disabled", false);
            $("input[name=rua]").val("");
            $("input[name=bairro]").prop("disabled", false);
            $("input[name=bairro]").val("");
            $("select[name=cidade]").prop("disabled", false);
            $("select[name=cidade]").val("");
            $("select[name=estado]").prop("disabled", false);
            $("select[name=estado]").val("");
        }
    });

    $('#estado').on('change', function() {
        let estadoId = $(this).val(); // Pega o ID do estado selecionado

        if (estadoId) {
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

            $.getJSON(urlCidades, function(data) {
                $('#cidade').empty(); // Limpa o select de cidades
                $('#cidade').append(`<option value="">Selecione a cidade</option>`); // Adiciona a opção padrão

                data.sort(function(a, b) {
                    return a.nome.localeCompare(b.nome);
                });

                data.forEach(function(cidade) {
                    $('#cidade').append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
                });

                // Popula o campo "Cidade" com a cidade que o CEP digitado
                // pelo usuário pertence.
                if (!resposta.hasOwnProperty("erro") && 
                    resposta.uf == $("select[name=estado]").val()) {
                    $("select[name=cidade]").val(resposta.localidade);
                }
            });
        } else {
            $('#cidade').empty(); // Limpa o select de cidades caso não haja estado selecionado
            $('#cidade').append(`<option value="">Primeiro selecione o estado</option>`);
        }
    });
}); 
