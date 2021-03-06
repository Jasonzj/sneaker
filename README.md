# React Sneaker

一个基于 React、Typescript 构建的球鞋比价网站，对比鞋子在 dewu, stockx, goat 三个网站的价格

![Build & Deploy](https://github.com/Jasonzj/sneaker/workflows/Build%20&%20Deploy/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Jasonzj/sneaker/badge.svg?branch=main)](https://coveralls.io/github/Jasonzj/sneaker?branch=main)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/Jasonzj/sneaker/blob/main/LICENSE)

[在线地址](http://www.sneakerapp.tk/)

## API

[node-sneaker](https://github.com/Jasonzj/node-sneaker)

## 技术桟

- 基于 [Create React App](https://github.com/facebook/create-react-app) 搭建
- React、React-hooks
- Typescript
- Axios

## 功能列表

- [x] 登录/登出/注册
- [x] 关注/取关/关注列表
- [x] Dewu Trending/Goat Trending
- [x] 搜索功能
  - [x] 支持 dewu, goat, stockx, db 搜索接口
  - [x] 搜索建议支持 dewu, stockx 搜索接口
- [x] 鞋子详情
  - [x] 各尺码价格比较, 支持 dewu, goat, stockx
  - [x] 最低价格显示

## 使用

```shell
$ yarn
$ yarn start
```

## Docker 容器运行

### docker
```shell
$ docker pull jasonzza/sneaker
$ docker run -dp 8000:80 jasonzza/sneaker
```
### docker-compose
```shell
$ docker-compose up -d
```


## 截图

<img src="https://github.com/Jasonzj/sneaker/blob/main/screenshots/demo.gif" width=800 align=left>
