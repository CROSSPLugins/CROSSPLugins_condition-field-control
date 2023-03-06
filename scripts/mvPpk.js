const fs = require('fs');
const path = require('path');

const dir = 'dist';
const fileList = fs.readdirSync(dir);
const fileNames = fileList.filter(RegExp.prototype.test, /.*\.ppk$/);

fileNames.forEach(fileName => {
  const oldFileName = path.join(dir, fileName);
  const ppkFileName = '.private.ppk';
  const newFileName = path.join(dir, ppkFileName);
  // ファイル名変更
  fs.renameSync(oldFileName, newFileName, err => {
    if (err) throw err;
  });
  // ファイル移動
  fs.renameSync(newFileName, `./plugin/.ppk/${ppkFileName}`, err => {
    if (err) throw err;
  });
});