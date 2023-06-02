Atividade final da disciplina de desenvolvimento para plataformas web da UNIFOR.
Plataforma que gerencia membros e instrutores de uma academia, a TI Gym. 

FERRAMENTAS: 
- Backend desenvolvido em NodeJS;

- Armazenamento e gereciamento de dados utilizando o MongoDB, via MongoDB Atlas;

- Desenvolvimento das views utilizando a engine EJS, para melhor operações entre front e backend;

- Estilização geral via Bootstrap;

- Roteamento com Express;

- Comunicação com a API via AXIOS;

COMANDOS:
npm start -> roda o servidor;
npm i ejs -> instala a engine ejs (em caso problemas de renderização);

FUNCIONALIDADES:
- A rota inicial ('localhost:3000') apresenta a Landing Page da TI Gym, que terá o botão 'Comece agora'
que redirecionará o usuário para a tela de registro, e na navbar, um link que levará para a tela de Login;

- Sistema de registro e login. Foi criado uma model que armazena email, username e senha, que faz
as autenticações e validações de login. Ao ter o login validado, o usuário é redirecionado a rota de gestão de usuário;

- Tela de gestão de usuário. A aplicação simula o gerenciamento de instrutores (ou funcionários em geral) e alunos.
A partir disso, a aplicação permite a apresentação, criação, edição, e remoção de instrutores e membros (CRUD);

