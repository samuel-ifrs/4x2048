<?php

session_start();

require_once ('const.php');
require_once ('board.php');

function getState(){

}

if(isset($_POST['action'])){

    $res = [
        'error' => 'Comando desconhecido'
    ];
    switch($_POST['action']){
        case 'newGame': {
            $boards = [];
            $score = 0;
            $boardsTiles = [];
            foreach(range(1,boardsCount) as $doesntmatter){
                $board = new Board; 
                $score += $board->score;
                $boards []= $board;
                $boardsTiles []= $board->tiles;
            }
            $startTime = date('Y/m/d H:i:s');
            $_SESSION['boards'] = serialize($boards);
            $_SESSION['score'] = $score;
            $_SESSION['startTime'] = $startTime;
            $_SESSION['playing'] = true;
            $res = [
                'tiles' => $boardsTiles,
                'score' => $score,
                'startTime' => $startTime
            ];
        break;
        }
        case 'move': {
            if(isset($_POST['dir'])){
                $dir = $_POST['dir'];
                if(in_array($dir, range(moveUp, moveRight))){
                    if(isset($_SESSION['playing'])) {
                        if($_SESSION['playing']) {
                            $lose = false;
                            $won = true;
                            $boards = unserialize($_SESSION['boards']);
                            $res = [
                                'boards' => [],
                                'startTime' => $_SESSION['startTime']
                            ];
                            $score = 0;
                            foreach($boards as $board){
                                $move = $board->moveAll($dir);
                                $curBoard['moves'] = $move;
                                $curBoard['tiles'] = $board->tiles;
                                $curBoard['won'] = $board->won;
                                $curBoard['score'] = $board->score;
                                $score += $board->score;
                                if($move['lose'] & (!$board->won)) {
                                    $lose = true;
                                }
                                $won = $won & $board->won;
                                $res['boards'] []= $curBoard;
                            }
                            $_SESSION['boards'] = serialize($boards);
                            $_SESSION['score'] = $score;
                            $res['lose'] = $lose;
                            $res['won'] = $won;
                            $res['score'] = $score;
                            if($lose){
                                $_SESSION['playing'] = false;
                            }
                        } else $res = ['error' => 'Essa partida já acabou...', 'score' => $_SESSION['score']];
                    } else $res = ['error' => 'Primeiro você precisa começar um novo jogo'];
                } else $res = ['error' => 'Direção inválida'];
            } else $res = ['error' => 'Você precisa definir a direção'];
        break;
        }
    }
    echo json_encode($res);
} 