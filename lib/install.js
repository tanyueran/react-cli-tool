/**
 * @author tanxin
 * @date 2021/1/7
 * @Description: 安装拷贝过来的依赖
 */

// 验证命令是否存在
let which = require('which');
// 添加文字背景
const chalk = require('chalk');
// 子进程
let childProcess = require('child_process');

/**
 * 开启子进程来执行npm install命令
 * @param cmd 命令的地址路径
 * @param args 参数
 * @param fn 回调函数
 */
function runCmd(cmd, args, fn) {
  args = args || [];
  let runner = childProcess.spawn(cmd, args, {
    stdio: 'inherit'
  });

  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  })
}

/**
 * 查找系统中用于安装依赖包的命令
 * @returns {string}
 */
function findNpm() {
  let npms = ['yarn', 'cnpm', 'npm'];
  for (let i = 0; i < npms.length; i++) {
    try {
      // 查找环境变量下指定的可执行文件的第一个实例
      which.sync(npms[i]);
      console.log('use npm: ' + npms[i]);
      return npms[i]
    } catch (e) {
    }
  }
  throw new Error(chalk.red('please install npm'));
}

let npm = findNpm();
runCmd(which.sync(npm), ['install'], function () {
  console.log(npm + ' install end');
})
