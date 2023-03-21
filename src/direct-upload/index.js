require("module-alias/register");
const fs = require('fs');
const path = require('path');
const slash = require('slash');
const OSS = require("ali-oss");
const config = require("@/config");

const DEFAULT_ALLOW_FILE = ["png", "jpg"];

// 读取目录下的图片文件，收集在 images 中
function readDir(entry, images = []) {
  const dirInfo = fs.readdirSync(entry);
  for (let i = 0; i < dirInfo.length; i++) {
    const item = dirInfo[i];
    // 拼装出文件/文件夹的路径
    const location = path.join(entry, item);
    const isDir = fs.statSync(location).isDirectory();
    // 如果为文件夹则继续递归向下查询
    if (isDir) {
      readDir(location, images);
      // 判断是否为所允许的图片格式
    } else if (DEFAULT_ALLOW_FILE.some(allowScheme => location.endsWith(allowScheme))) {
      images.push(location);
    }
  }
  return images;
}

// 定义检索的入口文件夹（ images 文件夹）
const staticDirPath = path.join(process.cwd(), 'images');
console.log(staticDirPath);
const images = readDir(staticDirPath);

const client = new OSS(config.oss);

async function upload() {
  for (let i = 0; i < images.length; i++) {
    const local_url = slash(images[i]);
    const remote_url = `images${local_url.split(staticDirPath)[1]}`;
    // 按顺序依次上传文件
    const result = await client.put(remote_url, local_url)
    console.log(`${result.url} 上传成功`);
  }
  console.log("所有文件上传成功");
}

upload();
