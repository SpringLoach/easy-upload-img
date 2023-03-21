const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");
const slash = require("slash");
const chalk = require("chalk");

const Watcher = require("./Watcher");

const DEFAULT_ALLOW_FILE = ["png", "jpg", "jpeg", "gif"];

class OSSUploader {
  constructor(config) {
    this.config = config;
    this.staticDirPath = path.join(__dirname, "../../images");
    this.allowFile = config.allowFile
      ? config.allowFile.split(",")
      : DEFAULT_ALLOW_FILE;
    this._init();
  }

  _init() {
    this.client = new OSS(this.config);
  }

  async putItem(image) {
    if (!fs.existsSync(image)) {
      return;
    }

    // 获取相对路径（images/..）后调用 slash
    // slash: 用于转换 Windows 反斜杠路径转换为正斜杠路径 \ => /
    const objectName = slash(`images${image.split(this.staticDirPath)[1]}`);
    const result = await this.client.put(objectName, image);
    console.log(`${result.url} 上传成功`);
  }

  watch() {
    console.log(chalk.blue("watch imageDir..."));
    const watcher = new Watcher();
    watcher.process(async (file) => {
      await this.putItem(file);
    });
  }
}

module.exports = OSSUploader;
