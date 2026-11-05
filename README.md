# Desafio Técnico – Automação de Testes com Cypress e TypeScript

## Sobre o projeto

Este projeto foi desenvolvido como parte de um desafio técnico de QA, com o objetivo de demonstrar conhecimentos em automação de testes de interface (E2E) e testes de API utilizando Cypress, TypeScript e Node.js.

A solução contempla cenários positivos e negativos, validações de autenticação, operações CRUD e fluxo de compra.

## Tecnologias utilizadas

- **Node.js:** 24.18.0
- **Cypress:** 16.2.1
- **TypeScript:** 7.0.2
- **Faker:** 10.6.0
- **IDE:** Visual Studio Code

## Estrutura do projeto

```text
cypress-typescript-challenge/
│
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── auth.cy.ts
│   │   │   └── bookings.cy.ts
│   │   │
│   │   └── frontend/
│   │       ├── checkout-validation.cy.ts
│   │       ├── checkout.cy.ts
│   │       ├── home.cy.ts
│   │       └── login.cy.ts
│   │
│   ├── fixtures/
│   ├── pages/
│   ├── support/
│   │   ├── commands.ts
│   │   └── e2e.ts
│   │
│   └── types/
│       └── booking.ts
│
├── cypress.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Aplicações utilizadas

### Testes de API – Restful Booker

Documentação: https://restful-booker.herokuapp.com/apidoc/index.html

### Testes de interface – Sauce Demo

Aplicação: https://www.saucedemo.com/

## Cobertura dos testes

Os cenários foram classificados conforme sua prioridade para o negócio.

| Área | Cenário | Prioridade | Automação |
|---|---|---|---|
| API | Autenticação com credenciais válidas | Alta | Implementado |
| API | Autenticação com credenciais inválidas | Alta | Implementado |
| API | Criar reserva (POST) | Alta | Implementado |
| API | Consultar reserva (GET) | Alta | Implementado |
| API | Atualizar reserva (PUT) | Alta | Implementado |
| API | Atualizar parcialmente (PATCH) | Alta | Implementado |
| API | Excluir reserva (DELETE) | Alta | Implementado |
| API | Excluir reserva sem autenticação | Alta | Implementado |
| Frontend | Acesso à página inicial | Média | Implementado |
| Frontend | Login com usuário válido | Alta | Implementado |
| Frontend | Login com usuário bloqueado | Alta | Implementado |
| Frontend | Login com usuário alternativo | Média | Implementado |
| Frontend | Login sem usuário ou senha | Alta | Implementado |
| Frontend | Compra completa até a confirmação | Alta | Implementado |
| Frontend | Validação dos campos obrigatórios do checkout | Alta | Implementado |
| Frontend | Logout | Média | Implementado |

## Cenários automatizados

### 1. API – Autenticação

- Autenticação com credenciais válidas.
- Validação da resposta para credenciais inválidas.
- Verificação da presença do token de autenticação.

### 2. API – Reservas

- Criação de reserva.
- Consulta dos dados da reserva criada.
- Atualização completa utilizando PUT.
- Atualização parcial utilizando PATCH.
- Validação dos dados após atualização.
- Exclusão da reserva.
- Validação de exclusão sem autenticação.
- Verificação de que a reserva excluída não está mais disponível.

Os dados de teste são gerados dinamicamente com Faker, reduzindo a dependência de registros fixos.

### 3. Frontend – Autenticação

- Login com usuário padrão.
- Tentativa de login com usuário bloqueado.
- Login com usuário alternativo.
- Validação de login sem preenchimento do usuário.
- Validação de login sem preenchimento da senha.

### 4. Frontend – Checkout

- Adição de produto ao carrinho.
- Validação do carrinho.
- Preenchimento dos dados de entrega.
- Finalização da compra.
- Validação da mensagem de confirmação.
- Logout da aplicação.

Também foram implementados cenários negativos para validar os campos obrigatórios do checkout:
- Primeiro nome.
- Sobrenome.
- CEP.

## Decisões técnicas

**Cypress + TypeScript**

Escolhidos pela integração entre automação de interface e API, além da tipagem estática proporcionada pelo TypeScript.

**Faker**

Utilizado para gerar dados dinâmicos durante a execução dos testes de API, evitando a repetição de informações fixas.

**Organização por contexto**

Os testes foram separados em diretórios de API e frontend, facilitando a manutenção e a identificação dos cenários.

**Interfaces TypeScript**

Foi criada uma interface `Booking` para representar a estrutura dos dados de reserva e melhorar a consistência das requisições.

**Execução independente**

Os testes podem ser executados individualmente por categoria ou em conjunto, utilizando scripts definidos no `package.json`.

## Como executar o projeto

### Pré-requisitos

- Node.js 20 ou superior.
- npm.
- Git.

### 1. Clonar o repositório

```bash
git clone https://github.com/guibandeira28/cypress-typescript-challenge.git
```

### 2. Acessar a pasta

```bash
cd cypress-typescript-challenge
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar todos os testes

```bash
npm test
```

### 5. Executar somente os testes de API

```bash
npm run test:api
```

### 6. Executar somente os testes de frontend

```bash
npm run test:e2e
```

### 7. Abrir o Cypress no modo interativo

```bash
npm run cy:open
```

## Resultados da execução

Última execução completa:

| Indicador | Resultado |
|---|---:|
| Arquivos de teste | 6 |
| Total de testes | 14 |
| Aprovados | 14 |
| Falhas | 0 |
| Ignorados | 0 |

**Status: todos os testes aprovados.**

## Limitações e estratégias de mitigação

### Restful Booker

A API utiliza um ambiente público compartilhado, sujeito a reinicializações periódicas e possíveis interferências de outros usuários.

Estratégias adotadas:
- Geração dinâmica de dados.
- Utilização do identificador retornado na criação da reserva.
- Exclusão dos registros criados ao final dos fluxos de teste.
- Evitar dependência de identificadores fixos.

### Sauce Demo

A aplicação é externa ao projeto e depende de sua disponibilidade e estabilidade.

Estratégias adotadas:
- Utilização dos usuários de demonstração disponibilizados pela aplicação.
- Validação de elementos e mensagens relevantes.
- Separação dos cenários positivos e negativos.

### Navegador

A execução atual utiliza o Electron disponibilizado pelo Cypress. A versão utilizada apresenta um aviso de descontinuação desse navegador como opção de teste. Caso necessário, é possível executar com outro navegador instalado e suportado, como Chrome.

## Próximas melhorias

- Implementar integração contínua com GitHub Actions.
- Expandir a cobertura de cenários negativos da API.
- Implementar uma camada de Page Objects para organizar as interações da interface.
- Aprimorar os relatórios de execução.
- Adicionar validações de contrato e schema nas respostas da API.

## Autor

**Guilherme Bandeira**

Projeto desenvolvido para demonstrar conhecimentos em QA, testes funcionais, testes de API e automação de testes com Cypress e TypeScript.