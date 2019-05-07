FROM alpine/node:latest

RUN yarn

CMD ["yarn", "start"]