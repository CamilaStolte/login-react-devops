# Multi-stage build para aplicação React
# Estágio 1: Build da aplicação
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Executa o build da aplicação
RUN npm run build

# Estágio 2: Servidor de produção
FROM nginx:alpine

# Copia os arquivos buildados do estágio anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]