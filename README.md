# 🧾 P.I RH 2.0

Projeto completo de um sistema de Recursos Humanos com **cadastro, listagem, edição e exclusão de funcionários**, desenvolvido para fins acadêmicos.

Este repositório contém tanto o frontend (React + Vite) quanto o backend (Django REST Framework), com autenticação via JWT e banco de dados PostgreSQL.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (Django)
- Python 3.10+
- Django 4+
- Django REST Framework
- Simple JWT
- PostgreSQL

### 💻 Frontend (React)
- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

---

## 📋 Funcionalidades

- Login com autenticação JWT
- Listagem de funcionários
- Cadastro de novos funcionários
- Edição de dados dos funcionários
- Remoção de funcionários
- Campos diversos: dados pessoais, contato, documentos, dados contratuais
- Cadastro de beneficiários para cada funcionário
- Validação de campos obrigatórios (ex: nome, setor)
- Comunicação 100% integrada entre frontend e backend

---

## ⚙️ Como rodar o projeto localmente

### 🐍 Backend (Django)

```bash
# 1. Navegue até a pasta do backend
cd backend/

# 2. Crie e ative o ambiente virtual
python -m venv venv
venv\Scripts\activate  # (Windows)
# source venv/bin/activate  # (Linux/Mac)

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Configure o banco de dados no settings.py (ou use .env se quiser)

# 5. Rode as migrações
python manage.py migrate

# 6. Crie um superusuário (para acessar o admin)
python manage.py createsuperuser

# 7. Rode o servidor
python manage.py runserver
```

### 🌐 Frontend (React + Vite)

```bash
# 1. Navegue até a pasta do frontend
cd rh-frontend/

# 2. Instale as dependências
npm install

# 3. Rode o servidor
npm run dev
```

> O frontend roda em `http://localhost:5173` e o backend em `http://localhost:8000`

---

## 🔐 Autenticação

- A autenticação é feita via JWT.
- Ao fazer login, o token é salvo no `localStorage` do navegador.
- Todas as requisições protegidas (GET, POST, PUT, DELETE) incluem esse token no header `Authorization: Bearer <token>`.

---

## 📡 Endpoints principais da API

| Método | Endpoint                  | Descrição                        |
|--------|---------------------------|----------------------------------|
| POST   | /api/token/               | Login e geração de token         |
| POST   | /api/token/refresh/       | Atualiza o token                 |
| GET    | /api/funcionarios/        | Lista funcionários               |
| POST   | /api/funcionarios/        | Cadastra novo funcionário        |
| GET    | /api/funcionarios/:id/    | Detalhe de um funcionário        |
| PUT    | /api/funcionarios/:id/    | Atualiza dados do funcionário    |
| DELETE | /api/funcionarios/:id/    | Remove funcionário               |

---

## 📷 Prints (opcional)

> Aqui você pode colar screenshots da interface (login, listagem, formulário etc).

---

## 👨‍💻 Autor

| Nome         | GitHub                          |
|--------------|----------------------------------|
| cbdisson     | [@cbdisson](https://github.com/cbdisson) |

---

## 📝 Observações

Este projeto foi desenvolvido para fins acadêmicos. Todos os arquivos do projeto estão disponíveis, incluindo configurações locais, por se tratar de um trabalho de escola.