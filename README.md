# 🐾 AmiPets

O AmiPets Frontend é a interface de usuário do projeto AmiPets, uma plataforma de adoção de animais de estimação. A aplicação foi desenvolvida com o objetivo de fornecer uma experiência intuitiva e amigável aos usuários, permitindo a navegação e a interação com a plataforma de forma simples e eficiente.

## 🚀 Objetivos

O objetivo principal do frontend do AmiPets é proporcionar uma experiência de usuário agradável e funcional para os adotantes e administradores, com funcionalidades como:

- Exibir informações detalhadas sobre os pets disponíveis para adoção.
- Realizar a adoção de pets diretamente na plataforma.
- Filtrar e buscar pets por diversas características.
- Navegar entre diferentes páginas de forma rápida e sem interrupções.

## 💻 Funcionalidades
- Exibição de Pets: Visualização de todos os pets disponíveis para adoção, com informações como nome, espécie, idade e tamanho.
- Busca e Filtros: Filtros avançados para buscar pets por características como espécie, status e personalidade.
- Adoção de Pet: Interação com a API para adotar pets, alterando o status dos mesmos para "adotado".
- Página de Detalhes: Visualização detalhada das informações de cada pet.
- Autenticação: Sistema de login e registro de usuários, com validação de dados e proteção de rotas.

## ⚙️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **JavaScript**: Linguagem de programação para adicionar interatividade ao frontend da aplicação.
- **React**: Framework JavaScript para a construção da interface de usuário. Utilizamos React para criar componentes reutilizáveis e gerenciar o estado da aplicação.
- **Axios**: Biblioteca para realizar requisições HTTP de forma simples e rápida, consumindo a API do backend para interagir com os dados.
- **CLSX**: Biblioteca para manipulação condicional de classes CSS, garantindo flexibilidade na aplicação de estilos dinâmicos e responsivos.
- **Tailwind** CSS: Framework utilitário para estilização, permitindo a criação de designs modernos diretamente no HTML com classes pré-definidas, flexíveis e customizáveis.
- **Zod**: Biblioteca para validação e tipagem de dados, garantindo que as entradas de dados estejam corretas e em conformidade com as regras estabelecidas.
- **Vercel**: Plataforma de deploy e hospedagem para aplicações web, garantindo a integração contínua e um alto desempenho de aplicação.
- **ESLint**: Ferramenta para análise estática de código, ajudando a identificar e corrigir problemas no código JavaScript, garantindo qualidade e consistência durante o desenvolvimento.

## 🏁 Como Rodar o Projeto
Para rodar este projeto em sua máquina local, siga os passos abaixo:

1. Clone o repositório 
```
    git clone https://github.com/AmiPets/amipets-web.git
```

2. Instale as dependências
 ```
    cd amipets-web
    npm install
```

3. Iniciar o Servidor
```
    npm run dev
```
O servidor estará rodando em http://localhost:5173.


4. Acesse a Aplicação Abra o navegador e acesse http://localhost:5173 para visualizar a aplicação em funcionamento.

## 📂 Estrutura do Projeto
O projeto está estruturado da seguinte forma:

    /src
        /assets         # Recursos estáticos, como imagens, fontes e arquivos de mídia
        /components     # Componentes reutilizáveis
        /hooks          # Hooks personalizados para lógica de estado e efeitos
        /layouts        # Layouts globais usados para organizar a estrutura visual das páginas
        /routes         # Definição e gerenciamento das rotas da aplicação
        /lib            # Funções e bibliotecas auxiliares para lógica de negócio
        /services       # Serviços para integração com APIs e gerenciamento de dados
        /styles         # Arquivos de estilização (CSS, SCSS, Tailwind)
        /views          # Páginas principais da aplicação, agrupando componentes e lógica
        /utils          # Funções utilitárias (ex.: validações, formatação de dados e manipulação de strings)
        main.jsx        # Arquivo principal de inicialização da aplicação
        router.jsx      # Configuração principal das rotas da aplicação
      .env              # Arquivo de configuração de variáveis de ambiente
      package.json      # Dependências e scripts do projeto

## ✍️ Autores

| <img src="https://avatars.githubusercontent.com/u/88061348?s=400&u=0f256aaecccd77a0d09b4b04b6a7f42e95729fbd&v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/122309444?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/128107879?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/11697564?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/49773194?v=4" width="100">  |
| --------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [HebertFSoares](https://github.com/HebertFSoares)                | [Ramon Godinho](https://github.com/Ramonlegend)                  | [Guilherme Bessa](https://github.com/Guiezz)                    | [Rodrigo Dorneles](https://github.com/roddorneles)              | [Gabriel Baptista](https://github.com/bapGabriel)              |


## 😎 Conclusão
O AmiPets Frontend proporciona uma interface moderna e fácil de usar para a plataforma de adoção de animais. Com o uso de React e Tailwind CSS, a aplicação oferece uma experiência de usuário fluida, enquanto tecnologias como Axios e Zod garantem a robustez e segurança na comunicação com o backend.


feito com ❤️ para Avanti Atlantico Bootcamp 2s2024 😊
