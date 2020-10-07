<?php

require_once('const.php');

Class Board{

    private function i2xy($index){
        return [
            'x' => (int) $index % boardSize,
            'y' => (int) floor($index / boardSize)
        ];
    }

    private function xy2i($x,$y){
        return (int) ($x + boardSize*$y);
    }

    public $won = false;

    public $score = 0;
    
    public $tiles = [];
    
    function __construct(){
        foreach(range(0, boardSize**2-1) as $i){
            $this->tiles[$i] = 0;
        }   
        $this->createTile();
    }

    public function createTile() {
        $possibleIndexes = [];
        $minTile = 0;
        foreach($this->tiles as $index => $value){
            if($value == 0) $possibleIndexes []= $index;
            elseif(($minTile > $value) || ($minTile == 0)) $minTile = $value;
        }
        if(sizeof($possibleIndexes) == 0) return false;
        if($minTile == 0)
            $newTile = 1;
        else {
            $newTile = $minTile;
            $vezes = rand(-1,3);
            $newTile = (integer) ceil($newTile / (2**$vezes));
        }
        $newIndex = $possibleIndexes[array_rand($possibleIndexes)];
        $this->tiles[$newIndex] = $newTile;
        $this->score += $newTile;
        return [
            'index' => $newIndex,
            'value' => $newTile,
            'created' => true
        ];
    }

    public function moveTile($index, $direction){
        $p = $this->i2xy($index);
        $px = $p['x'];
        $py = $p['y'];
        $vx = ($direction-2) % 2;
        $vy = ($direction-1) % 2;
        $npx = $px;
        $npy = $py;
        $curTile = -1;
        $movingTile = $this->tiles[$index];
        $oldTile = $movingTile;
        $segue = true;
        do {
            $px += $vx;
            $py += $vy;
            if((!in_array($px, range(0, boardSize-1))) || (!in_array($py, range(0, boardSize-1)))) break; // Verifica se $px e $py são números entre 0 e boardSize-1
            $curTile = $this->tiles[$this->xy2i($px, $py)]; // Variável contendo o bloco para o qual pretendemos mover
            if($curTile != 0) { // Verifica se o bloco está vazio
                if($curTile == $movingTile){ // Se não tiver, verifica se o bloco possui o mesmo valor do bloco que estamos movendo
                    $npx = $px;
                    $npy = $py;
                    $movingTile *= 2;
                    if($movingTile == 2048) $this->won = true;
                }
                $segue = false; 
            } else {
                $npx = $px;
                $npy = $py;
            }
        } while ($segue);
        $this->tiles[$index] = 0;
        $newInd = $this->xy2i($npx, $npy);
        $this->tiles[$newInd] = $movingTile;
        return [
            'newInd' => $newInd,
            'oldInd' => $index,
            'oldTile' => $oldTile,
            'newTile' => $movingTile,
            'ok' => $newInd != $index
        ];
    }
    public function moveAll($direction){
        // Direção do movimento
        $vx = (2 - $direction) % 2;
        $vy = (1 - $direction) % 2;
        // Índices iniciais
        $six = (boardSize-1) * (2 - abs($vx) - $vx) / 2;
        $siy = (boardSize-1) * (2 - abs($vy) - $vy) / 2;
        $tvx = (abs($vx) - 1)*((2 * $six / (boardSize-1)) - 1);
        $tvy = (abs($vy) - 1)*((2 * $siy / (boardSize-1)) - 1);
        $ix = $six;
        $iy = $siy;
        $moved = false;
        $history = [];
        for($c0 = 0; $c0 < boardSize; $c0++){
            for($c1 = 1; $c1 < boardSize; $c1++){
                $ix += $vx;
                $iy += $vy;
                $i = $this->xy2i($ix, $iy);
                if($this->tiles[$i] !== 0){
                    $mov = $this->moveTile($i, $direction);
                    if($mov['ok']){
                        $moved = true;
                        $this->lastMoveOld = $mov['oldInd'];
                        $this->lastMoveNew = $mov['newInd'];
                        $history []= [
                            'from' => $mov['oldInd'],
                            'to' => $mov['newInd']
                        ];
                    }
                }
            }
            $ix += $tvx - (boardSize-1)*$vx;
            $iy += $tvy - (boardSize-1)*$vy;
        }
        $lose = false;
        $created = null;
        if($moved || (rand(0,10) < 8)){
            $created = $this->createTile();
            if($created === false)
                $lose = true;
        }
        $this->lastMoveNew = -1;
        $this->lastMoveOld = -1;
        return [
            'moved' => $moved,
            'lose' => $lose,
            'created' => $created,
            'history' => $history
        ];
    }

    private $lastMoveNew = -1;
    private $lastMoveOld = -1;

    public function print(){ // Para depuração
        echo "\n\n<table style='margin: 10px; display: inline;'><tbody>";
        foreach($this->tiles as $ind => $value){
            if($ind % boardSize == 0){
                if($ind > 0){
                    echo "</tr>";
                }
                echo "\n<tr>";
            }
            if($value == 0) $value = "&nbsp;";
            $comp = '';
            if($ind == $this->lastMoveOld)
                $comp = 'background-color: red;';
            if($ind == $this->lastMoveNew)
                $comp = 'background-color: green;';
            echo "<td style='border: 1px solid black; $comp'>$value</td>";
        }
        echo "</tr></tbody></table>";
    }
}
?>