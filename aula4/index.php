<?php
var_dump($_POST);
// Se o usuário enviou o formulário
if (isset($_POST['submit'])) {
  // Cria variáveis com o nome do atributo 'name' dos inputs do formulário
  // Equivalente a:
  // $nome = $_POST['nome'];
  extract($_POST);

  if (empty($nome)) {
    echo '<div class="alert alert-danger" role="alert">Nome não preenchido!</div>';
  }

  if (empty($sobrenome)) {
    echo '<div class="alert alert-danger" role="alert">Sobrenome não preenchido!</div>';
  }
}
?>

<!DOCTYPE html>
<html lang="pt" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="style.css">
    <title>Cadastro</title>
</head>

<body>

    <div class="row">
        <div class="col-3 h2 text-center border pt-5">
            Barra lateral
        </div>
        <div class="col-8 mt-4">
            <div class="h1 text-center">
                Cadastre-se
            </div>
            <form action="index.php" method="post">
                <div class="row mt-4">
                    <div class="col-6">
                        <input type="text" class="form-control cont" name="nome" placeholder="Nome" value="<?php echo (isset($nome) ? $nome : '') ?>" >
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control cont" name="Sobrenome" placeholder="Sobrenome" >
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-6">
                        <input type="text" class="form-control cont" name="telefone" placeholder="Telefone" >
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control cont" name="email" placeholder="E-mail" >
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="input-group has-validation">
                            <input type="text" class="form-control cont" name="cep" placeholder="CEP" pattern="[\d]{5}-[\d]{3}" >
                            <div class="invalid-feedback">
                                CEP invalido
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-9">
                        <input type="text" class="form-control cont" name="rua" placeholder="Rua">
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control cont" name="numero" placeholder="Nº" >
                    </div>
                </div>
                <div class="row mt-3">

                    <div class="col-6">
                        <input type="text" class="form-control cont" name="bairro" placeholder="Bairro">
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" name="complemento" placeholder="Complemento" >
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <select class="form-select" id="estado" name="estado">
                            <option value="">Selecione o estado</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <select class="form-select" id="cidade" name="cidade">
                            <option value="">Selecione a cidade</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <input type="submit" class="btn btn-primary form-control" name="submit" value="Enviar">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</body>

</html>
