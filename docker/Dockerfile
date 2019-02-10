# 文件需要最终项目方式后 在修改。
FROM daocloud.io/node:5
ENV HTTP_PORT 8001
COPY dist /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install -g nodemon express path http body-parser http-proxy-middleware crypto-js

EXPOSE 8001

CMD ["nodemon", "server.js"]