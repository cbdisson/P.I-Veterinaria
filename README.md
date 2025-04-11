# 🐾 P.I Veterinária

Sistema web para gestão de **clientes, pets e vacinas** em uma clínica veterinária.

Projeto desenvolvido como parte do Projeto Integrador (P.I), utilizando **Django + React** com autenticação JWT e permissões por tipo de usuário.

## 🎯 Funcionalidades

- Cadastro, edição e exclusão de **clientes**
- Cada cliente pode ter múltiplos **pets**
- Cada pet pode ter várias **vacinas**
- Controle de acesso:
  - 👑 **Usuário Master** pode ver e editar tudo
  - 👤 **Usuário Visualizador** só pode ver seu próprio cadastro, pets e vacinas
- Login com **JWT Token**
- Interface moderna com **TailwindCSS**
- Banco de dados PostgreSQL

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- PostgreSQL

### Frontend
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Python 3.10+
- Node.js + npm
- PostgreSQL

### 1. Clone o projeto

```bash
git clone https://github.com/cbdisson/P.I-Veterinaria.git
cd P.I-Veterinaria
2. Backend - Django
bash
Copiar
Editar
cd vet_project
python -m venv venv
venv\Scripts\activate  # ou source venv/bin/activate no Linux/macOS

pip install -r requirements.txt

# Configure o banco no settings.py se necessário
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # crie um usuário master

python manage.py runserver
3. Frontend - React
bash
Copiar
Editar
cd vet_frontend
npm install
npm run dev
Acesse a aplicação em http://localhost:5173

👥 Tipos de Usuário
Tipo	Permissões
Master	CRUD completo em clientes, pets e vacinas
Visualizador	Só vê o próprio cadastro e dados associados
🐞 Possíveis melhorias
Cadastro de vacinas direto pela interface

Filtros e busca de clientes e pets

Upload de imagens do pet

Dashboard com gráficos