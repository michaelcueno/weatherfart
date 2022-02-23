FROM node
COPY . /app
WORKDIR "/app"
RUN yarn config set registry https://registry.npmjs.org
RUN yarn 
RUN yarn compile
CMD node /app/dist/main.js
