// 游戏状态对象：保存棋盘、胜负结果、当前步数
let gameState = {
  map: [[null, null, null], 
        [null, null, null], 
        [null, null, null]],
  result: null,
  moveCount: 0
};

// 检查是否有胜利者
function checkWin() {
  // 检查每一行和每一列
  for(let i = 0; i < 3; i++) {
    // 行
    if(gameState.map[i][0] !== null && gameState.map[i][0] === gameState.map[i][1] && gameState.map[i][1] === gameState.map[i][2]) {
      //highlightWin([ [i,0], [i,1], [i,2] ]);
      return gameState.map[i][0];
    }
    // 列
    if(gameState.map[0][i] !== null && gameState.map[0][i] === gameState.map[1][i] && gameState.map[1][i] === gameState.map[2][i]) {
      //highlightWin([ [0,i], [1,i], [2,i] ])
      return gameState.map[0][i];
    }
  }
  // 检查两条对角线
  if(gameState.map[0][0] !== null && gameState.map[0][0] === gameState.map[1][1] && gameState.map[1][1] === gameState.map[2][2]) {
    //highlightWin([ [0,0], [1,1], [2,2] ])
    return gameState.map[2][2];
  }
  if(gameState.map[0][2] !== null && gameState.map[0][2] === gameState.map[1][1] && gameState.map[1][1] === gameState.map[2][0]) {
    //highlightWin([ [0,2], [1,1], [2,0] ])
    return gameState.map[2][0];
  }
  // 没有胜利者
  return null;
}

// function highlightWin(cells) {
//   cells.forEach(([r,c]) => {
//     const box = document.querySelector(`[data-number="${r*3+c+1}"]`);
//     console.log(box)
//     box.classList.add('win');
//   });
// }

// 重置游戏：清空棋盘和状态
function resetGame() {
  gameState.moveCount = 0;
  gameState.map = [[null, null, null], 
                   [null, null, null], 
                   [null, null, null]];
  gameState.result = null;

  // 更新界面显示
  document.querySelector('.gameResultDisplay').innerText = "未开始";
  document.querySelector('.moveCount').innerText = gameState.moveCount;

  // 清空棋盘格子内容和样式
  document.querySelectorAll('.box').forEach(function(item){
    item.innerText = '';
    item.classList.remove('O', 'X', 'win'); // 移除样式class
  });
  console.clear();
}

// 处理玩家点击棋盘格子的逻辑
function handleMove(event) {
    const box = event.target;
    //console.log(box)
    // 只允许点击每一格，防止点到非格子元素
    if (!box.classList.contains('box')) return; 

    // 根据格子编号计算行列
    const number = box.dataset.number - 1;
    const row = Math.floor(number / 3);
    const col = number % 3;

    // 如果该格子已有棋子或已有胜负结果，则不处理
    if (gameState.map[row][col] !== null || gameState.result) return;
    console.log("gameState.moveCount= " + gameState.moveCount);

    // 根据当前步数决定下 o 或 x，第一手 o
    gameState.map[row][col] = gameState.moveCount % 2 === 0 ? 'O' : 'X';
    box.innerText = gameState.map[row][col];
    box.classList.add(gameState.map[row][col]);

    // 检查是否胜利
    gameState.result = checkWin(box);
    console.log("gameState.result= " + gameState.result);
    gameState.moveCount++;
    console.log(gameState.moveCount);

    // 更新界面显示
    document.querySelector('.moveCount').innerText = gameState.moveCount;
    document.querySelector('.gameResultDisplay').innerText = gameState.result ? gameState.result.toUpperCase() + " 赢了!" : gameState.moveCount === 9 ? "平局!" : "胜负未分";
}

// 初始化游戏：绑定事件 + 重置状态
function initGame() {
  //绑定一次事件
  document.querySelector('.row').addEventListener('click', handleMove)
  document.querySelector('.reset').addEventListener('click', resetGame);

  // 页面加载时清空棋盘
  //resetGame();
}

// 页面加载时执行初始化
initGame();