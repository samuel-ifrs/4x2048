window.boards = [];
window.onload = ()=>{
    function createBoard(){
        const options = {
            boardSize: 4,
            tileSize: '64px',
            borderSize: '10px',
            borderColor: 'rgb(187, 173, 160)',
            baseColor: '#ffffff40',
            animSpeed: '300ms'
        };
        const board = {};
        board.options = options;
        board.element = document.createElement('div');
        board.element.className = 'board';
        board.tiles = [];

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

        function moveTile(oPosX, oPosY, posX, posY){
            const tileIndex = oPosY*options.boardSize + oPosX;;
            const tile = board.tiles[tileIndex];
            if(tile){
                tile.posX = posX;
                tile.posY = posY;
                tile.object.style.setProperty('--posX', posX);
                tile.object.style.setProperty('--posY', posY);
                const index = posY*options.boardSize + posX;
                if(board.tiles[index]){
                    tile.value += board.tiles[index].value;
                    tile.object.setAttribute('value', tile.value);
                    removeTile(board.tiles[index]);
                }
                board.tiles[tileIndex] = null;
                board.tiles[index] = tile;
                return true;
            }
            return false;
        }

        function removeTile(tile){
            if(tile){
                tile.object.ontransitionend = (e) => {
                    if(e.propertyName == 'opacity')
                        tile.object.remove();
                }
                tile.object.style.opacity = 0;
                tile.object.style.transform = 'scale(0.75)';
                board.tiles[board.tiles.indexOf(tile)] = null;
            }
        }
        
        board.newTile = newTile;
        board.removeTile = removeTile;
        board.moveTile = moveTile;
        return board;
    }

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