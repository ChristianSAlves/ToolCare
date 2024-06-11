# Projeto Django com React para Empréstimo de Ferramentas

Este projeto é uma aplicação web desenvolvida com Django, React e Django Rest Framework (DRF) para gerenciar o empréstimo de ferramentas de empresas que possuem uma ferramentaria. Ele fornece uma interface amigável para cadastros de funcionários, ferramentas, emprestimos, e manutenções, o administrador do setor terá controle total das ferramentas, podendo observar o status de todos emprestimos.

## Funcionalidades Principais

1. **Usuário Administrador:** O usuário administrador pode cadastrar Funcionarios e Ferramentas, e realizar emprestimos para os funcionarios cadastrados.

2. **Cadastro de Ferramentas:** O administrador pode cadastrar as ferramentas que deseja emprestar, fornecendo informações como nome da ferramenta, descrição, condição, e foto, se necessário.

3. **Empréstimo:** O Administrador pode realizar um emprestimo envolvendo uma ferramenta e um funcionario.

4. **Manutenção:** O Administrador poderá colocar a ferramenta no estado de manutenção.

5. **Acompanhamento dos Emprestimos:** O Administrador poderá saber se uma ferramenta foi devolvida ou não, pesquisando por ela.

## Configuração do Ambiente de Desenvolvimento

### Backend (Django com DRF)

- Clone este repositório.
- Navegue até o diretório do projeto backend.
- Certifique-se de ter o poetry instalado.
- Dentro do diretório backend: `poetry shell`.
- Logo após utilize o comando: `poetry install` para instalar as dependecias.
- Configure o banco de dados conforme necessário no arquivo `settings.py`.
- Execute as migrações do Django: `python manage.py migrate`.
- Inicie o servidor Django: `python manage.py runserver`.

### Frontend (React)

- Navegue até o diretório do projeto frontend.
- Instale as dependências do Node.js usando npm ou yarn: `npm install` ou `yarn install`.
- Configure a URL da API no arquivo de configuração para se comunicar com o backend.
- Inicie o servidor de desenvolvimento React: `npm start` ou `yarn start`.

## Estrutura do Projeto

```
ToolCare/
│
├── backend/                      # Diretório do projeto Django com DRF
│   ├── app/                      # Aplicação Django principal
│   ├── projeto/                  # Configurações do projeto Django
│   ├── media/                    # Armazenamento de arquivos de mídia (fotos das ferramentas)
│   └── manage.py                 # Script de gerenciamento do Django
│
└── frontend/                     # Diretório do projeto React
    ├── public/                   # Arquivos públicos
    ├── src/                      # Código-fonte React
    ├── package.json              # Dependências e scripts do Node.js
    └── README.md                 # Instruções de configuração do frontend
```

## Autores

Este projeto foi desenvolvido por Christian de Sousa Alves e Alex Cole.

