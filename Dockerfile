# Stage 1
FROM node:lts-alpine3.19
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install -f
COPY . /app
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build" ]
# CMD [ "npm","start" ]
EXPOSE 3000

# # stage 2
# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT ["nginx","-g","daemon off;"]