# Specify a base image
FROM node:alpine 
WORKDIR /app
# Install dependencies
COPY ./package.json .
RUN yarn install 
COPY . .
EXPOSE 3001
# Default command
CMD ["yarn", "start"]