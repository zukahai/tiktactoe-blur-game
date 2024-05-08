class Minimax{
    constructor(){
        this.bestMove = null;
    }

    static getEmptyCells(data){
        let emptyCells = [];
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].length; j++){
                if(data[i][j] === ''){
                    emptyCells.push({i, j});
                }
            }
        }
        return emptyCells;
    }

    static getScore(data, depth){
        let winner = Minimax.checkWin(data);
        if(winner === 'o'){
            return 10 - depth;
        } else if(winner === 'x'){
            return depth - 10;
        } else {
            return 0;
        }
    }

    static checkWin(data) {
        data = data.map(row => row.map(col => col === 'xb1' || col == 'xb2' ? 'x' : col === 'ob1' || col == 'ob2' ? 'o' : col));
        for (let i = 0; i < 3; i++) {
            if (data[i][0] === data[i][1] && data[i][1] === data[i][2] && data[i][0] !== '') {
                return data[i][0];
            }
            if (data[0][i] === data[1][i] && data[1][i] === data[2][i] && data[0][i] !== '') {
                return data[0][i];
            }
        }
        if (data[0][0] === data[1][1] && data[1][1] === data[2][2] && data[0][0] !== '') {
            return data[0][0];
        }
        if (data[0][2] === data[1][1] && data[1][1] === data[2][0] && data[0][2] !== '') {
            return data[0][2];
        }
        return '';
    }

    static minimax(board, depth, isMax){
        if (depth > 5) return 0;
        let score = Minimax.getScore(board, depth);
        if(score !== 0){
            return score;
        }
        let emptyCells = Minimax.getEmptyCells(board);
        if(emptyCells.length === 0){
            return 0;
        }
        if(isMax){
            let best = -Infinity;
            for(let i = 0; i < emptyCells.length; i++){
                let {i: row, j: col} = emptyCells[i];
                let board_temp = Minimax.hit(board, row, col, 'o');
                let score = Minimax.minimax(board_temp, depth + 1, false);
                best = Math.max(score, best);
            }
            return best;
        } else {
            let best = Infinity;
            for(let i = 0; i < emptyCells.length; i++){
                let {i: row, j: col} = emptyCells[i];
                let board_temp = Minimax.hit(board, row, col, 'x');
                let score = Minimax.minimax(board_temp, depth + 1, true);
                best = Math.min(score, best);
            }
            return best;
        }
    }

    static hit(data, row, col, type) {
        let data_temp = new Array(data.length).fill(null).map(() => new Array(data[0].length).fill(''));
        for (let i = 0; i < data.length; i++)
            for (let j = 0; j < data[i].length; j++)
                data_temp[i][j] = data[i][j];
        if (type == 'x') {
            for (let i = 0; i < data.length; i++)
                for (let j = 0; j < data[i].length; j++)
                    if (data_temp[i][j] == 'xb2')
                        data_temp[i][j] = '';
                    else if (data_temp[i][j] == 'xb1')
                        data_temp[i][j] = 'xb2';
                    else if (data_temp[i][j] == 'x')
                        data_temp[i][j] = 'xb1';
            data_temp[row][col] = 'x';
        } else {
            for (let i = 0; i < data.length; i++)
                for (let j = 0; j < data[i].length; j++)
                    if (data_temp[i][j] == 'ob2')
                        data_temp[i][j] = '';
                    else if (data_temp[i][j] == 'ob1')
                        data_temp[i][j] = 'ob2';
                    else if (data_temp[i][j] == 'o')
                        data_temp[i][j] = 'ob1';
            data_temp[row][col] = 'o';
        }
        return data_temp;
    }

    static getBestMove(board){
        let best = -Infinity;
        let emptyCells = Minimax.getEmptyCells(board);
        for(let i = 0; i < emptyCells.length; i++){
            let {i: row, j: col} = emptyCells[i];
            let board_temp = Minimax.hit(board, row, col, 'o');
            let score = Minimax.minimax(board_temp, 0, false);
            if(score > best){
                best = score;
                this.bestMove = {row, col};
            }
        }
        console.log(best);
        return this.bestMove;
    }
}