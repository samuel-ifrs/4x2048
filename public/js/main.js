import createBoard from "./board.js";

window.boards = [];

window.onload = ()=>{

    for(let i=0;i<4;i++){
        const board = createBoard();
        window.boards.push(board);
        document.getElementById('game').appendChild(board.element);
    } 
};

window.teste = () => {
    let passos = [
        () => boards[0].newTile(1,1,1),
        () => boards[0].newTile(0,1,1),
        () => boards[0].newTile(0,0,2),
        () => boards[0].moveTile(1, 1, 0, 1),
        () => boards[0].moveTile(0, 1, 0, 0),
        () => boards[0].moveTile(0, 0, 0, 1),
        () => boards[0].moveTile(0, 1, 1, 1)
    ];
    console.log('[..] Teste automatizado');
    (function fazTeste(intervalo = 500) {
        const passo = passos.shift();
        console.log(" [->]", passo, "\n [<-] ");
        console.log(passo());
        if(passos.length > 0)
            setTimeout(fazTeste, intervalo);
        else
            console.log('[OK] Teste concluído');
    })()
}