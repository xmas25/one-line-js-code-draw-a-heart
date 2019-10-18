const readlineSync = require('readline-sync');
const wannaSay = readlineSync.question('Say something: ');
const paddingStr = wannaSay + ' ';
const M = Math;
const pow = M.pow;
const sleep = (ms) => new Promise((resolve) => {setTimeout(() => {resolve()}, ms)});
const gStdout = () => {
  let flag = -1;
  let len = paddingStr.length;
  return () => {
    if (flag >= len - 1) {
      flag = 0;
    } else {
      flag++;
    }
    return paddingStr[flag];
  }
};

const isIn = (x, y) => pow((pow((x * 0.05), 2) + pow((-y * 0.1), 2) - 1), 3) - pow((x * 0.05), 2) * pow((-y * 0.1), 3) < 0;
const output = gStdout();

const print = async (x, y) => {await process.stdout.write(isIn(x, y) ? '\033[91m' + output() : ' ');};

let y = -15;
const render = async () => {
  for (let x = -30; x < 30; x++) {
    await print(x, y);
    await sleep(2);
  }
  process.stdout.write('\n');
  if (y < 10) {
    y++;
    render();
  }
};
render();