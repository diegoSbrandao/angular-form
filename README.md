# Formulário de Endereço

Este é um formulário de endereço simples desenvolvido em Angular. Ele permite que os usuários preencham informações de endereço, como CEP, logradouro, bairro, cidade e estado, e realiza a busca automática do endereço com base no CEP fornecido.

## Funcionalidades

- Validação do CEP com um serviço de backend.
- Busca automática do endereço usando a API ViaCEP.
- Atualização dinâmica dos campos de endereço conforme o CEP é preenchido.
- Exibição de mensagens de erro e sucesso.
- Controle de acessibilidade dos campos de endereço.
- Envio do formulário quando todos os campos são preenchidos corretamente.

## Pré-requisitos

- Node.js deve estar instalado em seu computador. Você pode fazer o download e instalar a partir do site oficial do Node.js: https://nodejs.org

## Como executar a aplicação localmente

1. Clone este repositório para o seu computador ou faça o download como um arquivo ZIP e extraia-o.

2. Abra o terminal ou prompt de comando e navegue até o diretório raiz da aplicação.

3. No diretório raiz, execute o comando a seguir para instalar as dependências do projeto:

4. Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar a aplicação:
`ng serve`

5. Aguarde até que a compilação seja concluída e você veja uma mensagem indicando que o servidor está em execução.

6. Abra o seu navegador e navegue até `http://localhost:4200` (ou outra porta exibida na mensagem do servidor). Você deve ver a aplicação sendo executada no seu navegador.

## Observações

- Certifique-se de ter uma conexão com a internet para que a busca do endereço funcione corretamente.
- As mensagens de erro e sucesso são exibidas no formulário para fornecer feedback ao usuário.


