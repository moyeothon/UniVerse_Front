FROM node
WORKDIR /app
COPY package.json .
RUN npm cache clear --force
RUN npm install -verbose
COPY . .
EXPOSE 3000
CMD ["npm", "start"]