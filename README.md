# Login React DevOps

Projeto React com CI/CD configurado usando GitHub Actions.

## 🚀 Funcionalidades

- Sistema de login simples
- Interface responsiva
- Validação de credenciais

## 🔄 Workflows Configurados

### CI (Continuous Integration)
- **Arquivo**: `.github/workflows/ci.yml`
- **Trigger**: Push e Pull Requests nas branches `main` e `develop`
- **Funcionalidades**:
  - Instalação de dependências
  - Execução de testes
  - Build do projeto

### CD (Continuous Deployment)
- **Arquivo**: `.github/workflows/cd.yml`
- **Trigger**: Push na branch `main`
- **Funcionalidades**:
  - Deploy automático no GitHub Pages

## 📋 Como Usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute localmente: `npm start`
4. Faça push para a branch `main` para trigger do deploy

## 🎯 Credenciais de Teste

- **Email**: eduardo.lino@pucpr.br
- **Senha**: 123456
