require("module-alias/register");
const fs = require("fs");
const path = require("path");
const program = require("commander");
const pkg = require("./package.json");

const isConfigExist = fs.existsSync(
  path.join(__dirname, "./config/config.json")
);
if (!isConfigExist) throw new Error("You should create config/config.json");

const config = require("@/config");

program
  .version(pkg.version, "-v --version")
  // 注册参数upload，添加描述、回调
  .command("upload")
  .description("upload file to oss")
  .action(() => {
    const OSSUploader = require(`@/src/watch-upload`);
    const oss = new OSSUploader(config.oss);
    oss.watch();
  });

// 解析参数
program.parse(process.argv);
