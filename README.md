# easy-upload-img
轻松将本地图片上传到oss

## 介绍

在 github 上找到了很有意思的[项目](https://github.com/a1029563229/plugins)：基于 node 环境实现本地图片的上传；  

可以当作对 node 知识的练手，于是琢磨了一下代码，将核心部分捋了出来，能够实现直接上传/观察上传的功能。

## 使用

一、创建 bundle，获取 config/config.json 的属性值，并填充进去，获取方式可以参考[晒兜斯的教程](https://github.com/a1029563229/Blogs/tree/master/Plugins/Upload)；

二、 安装依赖
```elm
npm install
```

三、 使用直接上传  

:star2:  启动后会将整个`images` 目录直接上传
```elm
npm run direct-upload
```


四、 使用观察上传  

:star2: 启动后会监听`images` 目录下的变化，并自动上传变化的文件，返回对应的 url。
```elm
npm run watch-upload
```

