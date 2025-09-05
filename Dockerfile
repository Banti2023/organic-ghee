# Base image
FROM node:18

# Workdir set
WORKDIR /usr/src/app

# Package files copy
COPY package*.json ./

# Dependencies install
RUN npm install

# App code copy
COPY . .

# Port expose
EXPOSE 3000

# Start command
CMD ["npm", "start"]