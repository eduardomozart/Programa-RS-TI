$(document).ready(function() {
    $("input[name=cep]").mask("00000-000");
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
                    alert(data);
                });
            
        } 
        
    });
}); 