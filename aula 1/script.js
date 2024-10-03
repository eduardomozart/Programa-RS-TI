$(document).ready(function() {
    $("input[name=cep]").mask("00000-000");
    $("input[name=numero]").mask("#");

    $("form").on("submit", function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    
    $("input[name=cep]").on("keyup", function(event){
        let cep = $("input[name=cep]").val();
        cep = cep.replace("-", "");
        if(cep.length == 8){
            $("input[name=cep]").removeClass("is-invalid");
            // alert(cep);
            $.ajax("https://viacep.com.br/ws/" + cep + "/json")
            .done(function (data){
                let resposta = JSON.parse(data);
                if (resposta.erro) {
                    $("input[name=cep]").addClass("is-invalid");
                    return;
                }
                $("input[name=rua]").val(resposta.logradouro);
                $("select[name=estado]").val(resposta.uf);
                $("select[name=estado]").trigger("change");
                $("input[name=bairro]").val(resposta.bairro);
                $("input[name=complemento]").val(resposta.complemento);
                while ($("select[name=cidade]").length <= 1) {
                    $("select[name=cidade]").val(resposta.localidade);
                }
            });
        }
    });

    // Carregar cidades com base no estado selecionado
    $('select[name=estado]').on('change', function() {
        let estadoId = $(this).val(); // Pega o ID do estado selecionado
        alert("teste");

        if (estadoId) {
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

            $.getJSON(urlCidades, function(data) {
                $("select[name=cidade]").empty(); // Limpa o select de cidades
                $("select[name=cidade]").append(`<option value="">Selecione a cidade</option>`); // Adiciona a opção padrão

                data.sort(function(a, b) {
                    return a.nome.localeCompare(b.nome);
                });

                data.forEach(function(cidade) {
                    $("select[name=cidade]").append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
                });
            });
        } else {
            $("select[name=cidade]").empty(); // Limpa o select de cidades caso não haja estado selecionado
            $("select[name=cidade]").append(`<option value="">Selecione a cidade</option>`);
        }
    });

    const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

    // Carregar os estados na inicialização
    $.getJSON(urlEstados, function(data) {
        data.sort(function(a, b) {
            return a.nome.localeCompare(b.nome);
        });

        data.forEach(function(estado) {
            $('select[name=estado]').append(`<option value="${estado.sigla}">${estado.nome}</option>`);
        });
    });
}); 