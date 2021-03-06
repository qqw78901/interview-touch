# 基于Amaze UI Touch的interview-touch版

基于[Amaze UI Touch](https://github.com/amazeui/amazeui-touch) 快速上手套件，基于 React、Amaze UI Touch、React Router 及 Webpack 开发 SPA。

## 目录结构

项目文件放在 `app` 目录下：

```
.app
├── humans.txt
├── i              // 图片
├── index.html     // 入口 HTML
├── js             // JS
├── style           // 样式文件（编译任务中设置的是 Sass，可以自行改用其他）
├── manifest.json
├── manifest.webapp
└── robots.txt
```

## 使用说明


### 安装开发依赖

1. 克隆或下载本项目代码；
2. 进入项目目录，执行 `npm install`；
3.拉取interview桌面端源码启动interview后台服务器，默认8080端口，可在server.js自定义 
### 开发

```
npm start
```

### 构建生产环境版本

```
npm run build
```

如果想测试生产环境版本，可以执行以下命令构建并启动本地 HTTP 服务器预览：

```
npm run preview
```
