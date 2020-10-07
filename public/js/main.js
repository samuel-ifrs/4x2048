window.onload = ()=>{
    function createBoard(divBoard){
        const options = {
            boardSize: 4,
            tileSize: '64px',
            borderSize: '10px',
            borderColor: 'rgb(187, 173, 160)',
            baseColor: 'rgba(255, 255, 255, 0.5)',
        };
        const board = {};
        board.element = divBoard;
        for(const opt in options){
            board.element.style.setProperty(`--${opt}`,options[opt]);
        }
        for(let i=0; i<options.boardSize**2; i++){
            let ix = i % parseInt(options.boardSize);
            let iy = Math.trunc(i / options.boardSize);
            let ghostTile = document.createElement('div');
            ghostTile.className = 'ghostTile tile';
            ghostTile.style.setProperty('--posX', ix);
            ghostTile.style.setProperty('--posY', Math.trunc(i / options.boardSize));
            board.element.appendChild(ghostTile);
        }
        
        return board;
    }

    let board1 = createBoard(document.getElementById('board1'));
    let board2 = createBoard(document.getElementById('board2'));
    let board3 = createBoard(document.getElementById('board3'));
    let board4 = createBoard(document.getElementById('board4'));
};