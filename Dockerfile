FROM node:16.13.0
COPY . .
RUN yarn 
RUN yarn build

CMD ["yarn", "start"]
