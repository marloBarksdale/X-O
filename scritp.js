


const Active = true;
const Inactive = false;


let currentGame;
let P1;
let P2;

let numMoves = 0;
let game;


const selectMenu = document.querySelector("#mode");

selectMenu.onchange = function () {

    if (selectMenu.value === "Easy") {
        alert("Hello");
    }



}


const Game = () => {


    function endGame() {

        document.querySelector(".modal").style.display = "flex";


    }

    let myBoard = gameBoard();

    let moveCount = 0;


    let player1Name = document.querySelector('input[name = "firstName"]');
    let player2Name = document.querySelector('input[name = "secondName"]');

    if (player1Name.value.length === 0) {
        player1Name = player1Name.placeholder;
    }
    else {
        player1Name = player1Name.value;
    }


    if (player2Name.value.length === 0) {
        player2Name = player2Name.placeholder;
    }
    else {
        player2Name = player2Name.value;
    }




    console.log(player1Name);

    Player1 = Player(player1Name, "X");
    Player2 = Player(player2Name, "O");

    currentPlayer = Player1;


    let scores = {
        X: 10,
        O: -10,
        tie: 0

    };


    let winner = null;

    function equals(a, b, c) {

        return (a.getContent() === b.getContent() && c.getContent() === a.getContent() && a.state === Active);
    }



    function checkGame() {

        winner = null;
        // 0=1=2 
        if (equals(myBoard.array[0], myBoard.array[1], myBoard.array[2])) {

            //console.log(`${myBoard.array[0].getContent()} wins`);
            winner = myBoard.array[0].getContent();
        }



        if (equals(myBoard.array[0], myBoard.array[4], myBoard.array[8])) {

            //console.log(`${myBoard.array[0].getContent()} wins`);
            winner = myBoard.array[0].getContent();
        }


        if (equals(myBoard.array[0], myBoard.array[3], myBoard.array[6])) {

            //console.log(`${myBoard.array[0].getContent()} wins`);
            winner = myBoard.array[0].getContent();
        }


        if (equals(myBoard.array[1], myBoard.array[4], myBoard.array[7])) {

            //console.log(`${myBoard.array[1].getContent()} wins`);
            winner = myBoard.array[1].getContent();
        }



        if (equals(myBoard.array[2], myBoard.array[4], myBoard.array[6])) {

            //console.log(`${myBoard.array[2].getContent()} wins`);
            winner = myBoard.array[2].getContent();
        }


        if (equals(myBoard.array[2], myBoard.array[5], myBoard.array[8])) {

            //console.log(`${myBoard.array[2].getContent()} wins`);
            winner = myBoard.array[2].getContent();
        }


        if (equals(myBoard.array[3], myBoard.array[4], myBoard.array[5])) {

            //console.log(`${myBoard.array[3].getContent()} wins`);
            winner = myBoard.array[3].getContent();
        }


        if (equals(myBoard.array[6], myBoard.array[7], myBoard.array[8])) {
            //console.log(`${myBoard.array[6].getContent()} wins`);
            winner = myBoard.array[6].getContent();

        }



        if (winner === null && numMoves === 9) {


            return "tie";


        } else {

            return winner;

        }





    }





    currentPlayer = Player1;
    console.log(`${currentPlayer.getName()}`);
    myBoard.array.forEach(element => {

        element.point.addEventListener("click", function () {

            if (element.state) {
                console.log(element.state);

                return;
            }

            console.log(currentPlayer.getTeam());
            element.draw(currentPlayer.getTeam());
            numMoves++;



            currentPlayer = Player2;
            console.log(currentPlayer.getTeam());

            if (numMoves < 9) {
                makeMove(myBoard);
                console.log("player2 plays")
                numMoves++;

                currentPlayer = Player1;
            }


            checkGame();

        });
    })





    // return{Player1, Player2, myBoard};


    function printPLayers() {
        console.log(Player1.getTeam());
    }

    return { checkGame };








    function makeMove(board) {




        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 9; i++) {

            if (board.array[i].state === Inactive) {
                board.array[i].draw(Player2.getTeam());
                numMoves++;
                let score = minimax(board, 8, false);
                board.array[i].erase();
                numMoves--;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }





        // let aiMove = Math.floor(Math.random() * 9);

        // if (board.array[aiMove].state === Inactive) {

        //     board.array[aiMove].draw(prototype.getTeam());


        // }
        // else {
        //     makeMove(board);
        // }





        board.array[bestMove].draw(Player2.getTeam());
        currentPlayer = Player1;
        // console.log("crazy loop");

        // // numMoves++;
    }




    function minimax(board, depth, isMaximizing) {

       
       if(depth < 4){
           return null;
       }

       


        let scores = {
            O: 10,
            X: -10,
            tie: 0

        };


        let result = checkGame();


        if (result !== null) {


            return scores[result];
        }

        if (isMaximizing) {

            let bestScore = -Infinity
            for (let i = 0; i < 9; i++) {

                if (board.array[i].state === Inactive) {
                    board.array[i].draw(Player2.getTeam());

                    numMoves++;
                    let score = minimax(board, depth - 1, false);
                    board.array[i].erase();
                    numMoves--;

                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }

            return bestScore;
        } else {


            let bestScore = Infinity
            for (let i = 0; i < 9; i++) {

                if (board.array[i].state === Inactive) {
                    board.array[i].draw(Player1.getTeam());
                    // console.log(currentGame.Player1.getTeam());
                    numMoves++;

                    let score = minimax(board, depth - 1, true);
                    board.array[i].erase();
                    numMoves--;

                    if (score < bestScore) {
                        bestScore = score;
                    }
                }
            }

            return bestScore;



        }
    }



}





const grid = () => {

    let point = document.createElement("div");
    point.style.display = "flex";
    point.style.alignItems = "center";
    point.style.justifyContent = "center";
    point.style.textAlign = "center";

    let state = Inactive;

    const getContent = () => point.textContent;



    function draw(string) {

        this.state = Active;
        this.point.textContent = string;


    }

    function erase() {
        this.point.textContent = "";
        this.state = Inactive;
    }



    return { point, state, draw, getContent, erase };


}



const gameBoard = () => {

    let array = [];

    for (i = 0; i < 9; i++) {
        array.push(grid());
    }


    const board = document.querySelector(".board");

    board.style.display = "grid";
    board.style.gridTemplateColumns = "repeat(3,1fr) ";
    board.style.gridTemplateRows = "repeat(3,1fr) ";
    board.style.gridGap = "5px";



    array.forEach(element => {
        board.append(element.point);
    });


    return { board, array };
    // board.style.cssText = "border: 0.5px black solid";

}




const Player = (playerName, team) => {

    const getName = () => playerName;
    const getTeam = () => team;




    return { getName, getTeam };

}




// function minimax(board, depth, isMaximizing) {


//     let scores = {
//         X: 10,
//         O: -10,
//         tie: 0

//     };


//    let result = currentGame.checkGame();
// console.log(result);
//    console.log();


//     console.log(result + " wins");

//     if (result != null) {
//         let score = scores[result];
//         console.log(score + " the score");
//         console.log(scores[result]);
//         return score;
//     }

//     if (isMaximizing) {

//         console.log("IsMaximizing");
//         let bestScore = -Infinity
//         for (let i = 0; i < 9; i++) {

//             if (board.array[i].state === Inactive) {
//                 board.array[i].draw(Player2.getTeam());
//                 numMoves++;
//                 let score = minimax(board, depth + 1, false);
//                 board.array[i].erase();
//                 numMoves--;
//                 if (score > bestScore) {
//                     bestScore = score;
//                 }
//             }
//         }

//         return bestScore;
//     } else {

//         console.log("isMinimizing");
//         let bestScore = Infinity
//         for (let i = 0; i < 9; i++) {

//             if (board.array[i].state === Inactive) {
//                 board.array[i].draw(Player1.getTeam());
//                 // console.log(currentGame.Player1.getTeam());
//                 numMoves++;
//                 let score = minimax(board, depth + 1, true);
//                 board.array[i].erase();
//                 numMoves--;
//                 if (score < bestScore) {
//                     bestScore = score;
//                 }
//             }
//         }

//         return bestScore;



//     }
// }




// const AI = (playerName, playerTeam) => {


//     const prototype = Player(playerName, playerTeam);

//     console.log(prototype.getName() + "HERE!!");


//     function makeMove(board) {





//         let bestScore = -Infinity;
//         let bestMove;
//         for (let i = 0; i < 9; i++) {

//             if (board.array[i].state === Inactive) {
//                 board.array[i].draw(prototype.getTeam());
//                 numMoves++;
//                 let score = minimax(board, 0, false);
//                 board.array[i].erase();
//                 numMoves--;
//                 if (score > bestScore) {
//                     bestScore = score;
//                     bestMove = i;
//                 }
//             }
//         }





//         // let aiMove = Math.floor(Math.random() * 9);

//         // if (board.array[aiMove].state === Inactive) {

//         //     board.array[aiMove].draw(prototype.getTeam());


//         // }
//         // else {
//         //     makeMove(board);
//         // }





//          board.array[bestMove].draw(prototype.getTeam());
//          currentPlayer = Player1;
//         // console.log("crazy loop");

//         // // numMoves++;
//     }





//     const showName = () => {

//         console.log(prototype.getName() + " Showname")
//     }


//     return Object.assign({}, prototype, { makeMove }, { showName });

// }


Game();


console.log(currentGame);
console.log(Player2.getTeam());
