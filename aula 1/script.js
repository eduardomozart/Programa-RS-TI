$(document).ready(function() {
    $("form").on("submit", function(event){
        event.stopPropagation();
        event.preventDefault();
    });

    $("input[name=cep]").on("change", function(event){
        
    });
}); 