FROM node

# 使用淘宝 NPM 镜像（国内机器构建推荐启用）
# RUN npm config set registry https://registry.npm.taobao.org/

# npm install
ADD package*.json /src/
WORKDIR /src
RUN npm i

# install pm2
RUN npm install pm2 -g

# build
ADD . /src
RUN npm run build

# clean
RUN npm prune --production

# move
RUN rm -rf /app \
    && mv dist /app \
    && mv node_modules /app/ \
    && mv .env /app \
    && rm -rf /src

# ENV
#ENV NODE_ENV production

WORKDIR /app
#CMD ["node", "src/index.js"]
CMD ["pm2-runtime", "src/index.js", "-i", "4"]

EXPOSE 3000