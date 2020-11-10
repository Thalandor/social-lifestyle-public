# Specify a base image
FROM node:latest 
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3001
# Default command
CMD ["npm", "run", "start"]