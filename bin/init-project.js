#!/usr/bin/env node
/**
 * @author tanxin
 * @date 2021/1/7
 * @Description: 拷贝模板项目入口文件
 */

// 命令
let program = require('commander');
// 文件操作
let vfs = require('vinyl-fs');
let map = require('map-stream');
// 添加文字背景
const chalk = require('chalk');
// fs的扩展
const fs = require('fs-extra');
const path = require('path');
// 日期处理工具
let dayjs = require('dayjs');
// 引入配置文件
let config = require("../config/index");

// 定义版本号以及命令选项
program
  .version('0.0.1')
  .option('-i --init [projectName]', 'init a project', config.projectName)

program.parse(process.argv);

if (program.init) {
  // 获取将要构建的项目根目录
  let projectPath = path.resolve(program.init);
  // 获取将要构建的的项目名称
  let projectName = path.basename(projectPath);
  // 输出目录
  outputPath = path.join(path.resolve(__dirname, "../output"), projectName)
  console.log(`Start to init a project in ${chalk.green(outputPath)}`);

  // 根据将要构建的项目名称创建文件夹
  fs.ensureDirSync(outputPath);

  // 获取本地模块下的demo1目录
  let cwd = path.join(__dirname, '../template/templateProject');

  // 从templateProject目录中读取除node_modules目录下的所有文件并筛选处理
  vfs
    .src(
      ['**/*', '!node_modules/**/*', '!.idea/**/*', "!.idea"],
      {
        cwd: cwd, // 目录地址
        dot: true,// 是否匹配 .xxx文件  例如：.gitignore
      })
    .pipe(map((file, callback) => {
      if (file.stat.isFile()) {
        // 对模块中的东西进行处理
        let content = file.contents.toString("utf8");

        // 当前时间串儿
        let timeStr = dayjs().format('YYYY-MM-DD');
        let newContent = content
          // 将模板中 [%date%]  替换成当前时间
          .replace(/\[%date%\]/g, timeStr)
          // 将模板中 [%projectName%] 替换成项目名称
          .replace(/\[%projectName%\]/g, projectName)
          // 作者
          .replace(/\[%author%\]/g, config.author)
        ;
        file.contents = Buffer.from(newContent);
      }
      return callback(null, file);
    }))

    // 将从demo1目录下读取的文件流写入到之前创建的文件夹中
    .pipe(vfs.dest(outputPath))

    // 结果的监听回调
    .on('end', function () {
      console.log('Installing packages...')

      // 将node工作目录更改成构建的项目根目录下
      process.chdir(outputPath);

      // 执行安装命令
      require('../lib/install');
    })
    .resume();
}
