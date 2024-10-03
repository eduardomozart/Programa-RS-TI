$(document).ready(function() {
    // Variável global "resposta" que armazena
    // a resposta JSON da consulta do CEP
    // digitado pelo usuário.
    let resposta = '';

    $("input[name=cep]").mask("00000-000");
    $("input[name=numero]").mask("n",{
        translation: {
            'n':{
                pattern: /[0-9]/,
                recursive: true
            }
        }
    });

    const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    // Carregar os estados na inicialização
    $.getJSON(urlEstados, function(data) {
        data.forEach(function(estado) {
            $('#estado').append(`<option value="${estado.sigla}">${estado.nome}</option>`);
            
        });
    });

    $("form").on("submit", function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    
    $("input[name=cep]").on("keyup", function(event){
        let cep = $("input[name=cep]").val();
        cep = cep.replace("-", "");
        if(cep.length == 8){
            $("input[name=cep]").removeClass("is-invalid");
            //alert(cep);
            $.ajax("https://viacep.com.br/ws/"+ cep +"/json")
            .done(function(data){
                resposta = JSON.parse(data);
                if(resposta.erro){
                    $("input[name=cep]").addClass("is-invalid");
                }else{
                    $("input[name=rua]").val(resposta.logradouro);
                    $("input[name=bairro]").val(resposta.bairro);
                    $("select[name=estado]").val(resposta.uf);
                    $("select[name=estado]").trigger("change");
                    $("input[name=complemento]").val(resposta.complemento);
                }
                
            });
            
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
                $("select[name=cidade]").val(resposta.localidade);
            });
        } else {
            $('#cidade').empty(); // Limpa o select de cidades caso não haja estado selecionado
            $('#cidade').append(`<option value="">Primeiro selecione o estado</option>`);
        }
    });
}); 