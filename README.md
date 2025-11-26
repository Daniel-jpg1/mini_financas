# 💰 Mini Finanças

Aplicação Full Stack de controle financeiro pessoal, com foco em cadastro de usuários, registro de entradas e saídas, e organização financeira básica.

O objetivo do projeto é oferecer uma solução simples e funcional para gerenciamento de finanças pessoais.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Database
- MySQL 


### 🔹 Back-end
- Node.js  
- Express    
- Sequelize  
- Dotenv  
- Cors  

### 🔹 Front-end
- React.js  
- Fetch / Axios para requisições HTTP  

### 🔹 Ferramentas e Métodos
- Postman (testes de API)  
- GitHub Projects (Kanban e gestão de tarefas)  
- Commits versionados com Git  

---

## 🧩 Funcionalidades Principais

- Cadastro e autenticação de usuários  
- Registro e listagem de transações (entradas e saídas)  
- Organização e controle financeiro pessoal  

---

## 📦 Estrutura

```
mini-financas/
│
├── backend/
│ ├── controllers/ → lógica das rotas
│ ├── services/ → regras de negócio
│ ├── models/ → tabelas e associações (Sequelize)
│ ├── routes/ → definição das rotas da API
│ ├── middleware/ → autenticação, validação e tratamento de erros
│ ├── validators/ → schemas de validação 
│ ├── database/ → conexão MySQL
│ ├── server.js → inicialização do servidor
│ └── .env → variáveis de ambiente
│
├── frontend/
│ ├── src/ → componentes React e páginas
│ └── public/
│
└── README.md → documentação
```

