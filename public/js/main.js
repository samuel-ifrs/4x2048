import createBoard from "./board.js";

window.score = 0;
window.boards = [];
window.onload = () => {
    function newGame() {
        document.getElementById('game').innerHTML = '';
        window.score = 0;
        window.boards = [];
        axios.post('../server/', `action=newGame`)
            .then(res => {
                const data = res.data;
                document.getElementById('score').innerText = data.score;
                document.getElementById('highScore').innerText = data.highScore;
                for (const tiles of data.tiles) {
                    const board = createBoard();
                    window.boards.push(board);
                    document.getElementById('game').appendChild(board.element);
                    window.startTime = data.startTime;
                    tiles.forEach((tile, index) => {
                        if (tile > 0)
                            board.newTile(index, tile);
                    })
                }
            });
    }

    setInterval(() => {
        if (window.startTime) {
            const total = Math.trunc((Date.now() - ((new Date(window.startTime)).getTime())) / 1000);
            document.getElementById('currentTime').innerText =
                `${("0"+Math.trunc(total / 60)).slice(-2)}:${("0"+(total % 60)).slice(-2)}`;

        }
    }, 250);

    function moveKeyHandle(key) {
        const allowedKeys = {
            'ArrowUp': 0,
            'ArrowLeft': 1,
            'ArrowDown': 2,
            'ArrowRight': 3,
            'W': 0,
            'A': 1,
            'S': 2,
            'D': 3,
        };
        const keyValue = allowedKeys[key];
        if (keyValue === undefined) return false;
        axios.post('../server/', `action=move&dir=${keyValue}`)
            .then(res => {
                const data = res.data;
                if (data.error) {
                    console.log(data.error);
                    return false;
                }
                document.getElementById('score').innerText = data.score;
                document.getElementById('highScore').innerText = data.highScore;
                window.startTime = data.startTime;
                data.boards.forEach((curBoard, index) => {
                    // Realiza os movimentos no tabuleiro
                    const { created, history } = curBoard.moves;
                    history.forEach(({ from, to }) => window.boards[index].moveTile(from, to));
                    if (created)
                        window.boards[index].newTile(created.index, created.value);
                    // Confirma os dados do tabuleiro
                    window.boards[index].updateTiles(curBoard.tiles);
                });
                return true;
            });
        return true;
    }

    newGame();
    document.getElementById('newGame').onclick = newGame;
    window.onkeydown = e => {
        if (moveKeyHandle(e.key)) e.preventDefault();
    }
};