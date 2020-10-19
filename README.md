## 开发前准备

1. 安装 ffmpeg，并添加环境变量，下载地址[http://www.ffmpeg.org/download.html](http://www.ffmpeg.org/download.html)
2. 服务端依赖安装，项目根目录下 yarn 或 npm i
3. 前端代码依赖安装, front 目录，yarn 或者 npm i

## 配置文件

目前只设置了端口号，默认 8061, 修改.env 即可

## 开发

1. 服务端,项目根目录下 `yarn start:dev`，访问路径 http://localhost:8061

2. 前端，front 目录下 `yarn dev`，访问路径 http://localhost:3000

## 构建

1. 前端，front 目录下 `yarn build`
2. 服务端,项目根目录下 `yarn build; pm2 start dist/main.js`
3. 前端访问路径，http://localhost:8061/front
