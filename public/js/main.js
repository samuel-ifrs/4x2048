import createBoard from "./board.js";

window.boards = [];
window.onload = ()=>{
    for(let i=0;i<4;i++){
        const board = createBoard();
        window.boards.push(board);
        document.getElementById('game').appendChild(board.element);
    }
};