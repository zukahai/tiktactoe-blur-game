class Minimax{
    constructor(){
        this.bestMove = null;
    }

    static norDepth = 7;
    static maxDepth = 13;

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
            return Minimax.maxDepth - depth;
        } else if(winner === 'x'){
            return depth - Minimax.maxDepth;
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

    static minimax(board, depth, isMax, maxDepth){
        if (depth > maxDepth) {
            return 0;
        }
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
                let score = Minimax.minimax(board_temp, depth + 1, false, maxDepth);
                best = Math.max(score, best);
            }
            return best;
        } else {
            let best = Infinity;
            for(let i = 0; i < emptyCells.length; i++){
                let {i: row, j: col} = emptyCells[i];
                let board_temp = Minimax.hit(board, row, col, 'x');
                let score = Minimax.minimax(board_temp, depth + 1, true, maxDepth);
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

    static getDepth(level) {
        let depthLevel = [
            {maxDepth: 1, norDepth: 1},
            {maxDepth: 2, norDepth: 2},
            {maxDepth: 3, norDepth: 3},
            {maxDepth: 4, norDepth: 4},
            {maxDepth: 4, norDepth: 4},
            {maxDepth: 5, norDepth: 5},
            {maxDepth: 5, norDepth: 6},
            {maxDepth: 5, norDepth: 7},
            {maxDepth: 5, norDepth: 8},
            {maxDepth: 6, norDepth: 8},
            {maxDepth: 7, norDepth: 8},
            {maxDepth: 7, norDepth: 9},
            {maxDepth: 7, norDepth: 10},
            {maxDepth: 7, norDepth: 11},
            {maxDepth: 7, norDepth: 12},
            {maxDepth: 7, norDepth: 13},
            {maxDepth: 8, norDepth: 13},
            {maxDepth: 9, norDepth: 13},
            {maxDepth: 9, norDepth: 13},
            {maxDepth: 9, norDepth: 13},
        ]
        return {maxDepth: depthLevel[level].maxDepth, norDepth: depthLevel[level].norDepth};
    }

    static getBestMove(board, level){
        let best = -Infinity;
        let emptyCells = Minimax.getEmptyCells(board);
        let depth = Minimax.getDepth(level);
        let maxDepth = emptyCells.length == 3 ? depth.maxDepth : depth.norDepth;
        Minimax.maxDepth = maxDepth;

        let ans = new Array(3).fill(null).map(() => new Array(3).fill(null));
        for(let i = 0; i < emptyCells.length; i++){
            let {i: row, j: col} = emptyCells[i];
            let board_temp = Minimax.hit(board, row, col, 'o');
            let score = Minimax.minimax(board_temp, 0, false, maxDepth);
            ans[row][col] = score;
            if(score > best){
                best = score;
                this.bestMove = {row, col, score};
            }
        }
        let ansRandom = [];
        for(let i = 0; i < ans.length; i++){
            for(let j = 0; j < ans[i].length; j++){
                if(ans[i][j] === best){
                    ansRandom.push({row: i, col: j, score: ans[i][j]});
                }
            }
        }
        let random = Math.floor(Math.random() * ansRandom.length);
        return ansRandom[random];
    }
}