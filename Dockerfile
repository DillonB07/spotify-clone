FROM node:17.4.0
COPY . .
RUN yarn 

CMD ["yarn", "dev"]
