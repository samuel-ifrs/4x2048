window.boards = [];
window.onload = ()=>{
    function createBoard(divBoard){
        const options = {
            boardSize: 4,
            tileSize: '64px',
            borderSize: '10px',
            borderColor: 'rgb(187, 173, 160)',
            baseColor: '#ffffff40'
        };
        const board = {};
        board.options = options;
        board.element = divBoard;
        board.tiles = [];
        function setTile(posX, posY, object, value){
            const index = posY*options.boardSize + posX;
            object.style.setProperty('--posX', posX);
            object.style.setProperty('--posY', posY);
            object.setAttribute('value', value);
            board.tiles[index] = {posX, posY, value, object};
        }
        function newTile(posX, posY, value = 1){
            const index = posY*options.boardSize + posX;
            let object;
            if(board.tiles[index])
                object = board.tiles[index].object;
            else {
                object = document.createElement('div');
                object.className = 'tile';
                board.element.appendChild(object);
            }
            setTile(posX, posY, object, value);
        }
        board.newTile = newTile;
        for(const opt in options){
            board.element.style.setProperty(`--${opt}`,options[opt]);
        }
        for(let i=0; i<options.boardSize**2; i++){
            let ix = i % parseInt(options.boardSize);
            let iy = Math.trunc(i / options.boardSize);
            board.tiles[i] = null;
            let ghostTile = document.createElement('div');
            ghostTile.className = 'ghostTile tile';
            ghostTile.style.setProperty('--posX', ix);
            ghostTile.style.setProperty('--posY', Math.trunc(i / options.boardSize));
            board.element.appendChild(ghostTile);
        }
        
        return board;
    }

    window.boards.push(createBoard(document.getElementById('board1')));
    window.boards.push(createBoard(document.getElementById('board2')));
    window.boards.push(createBoard(document.getElementById('board3')));
    window.boards.push(createBoard(document.getElementById('board4')));
};