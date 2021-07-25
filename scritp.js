

let Active = true;
let Inactive = false;
let num = 0;


const selectMenu = document.querySelector("#mode");

selectMenu.onchange = function(){

    if(selectMenu.value === "Easy"){
        alert("Hello");
    }



}






const Game = () =>{

    function endGame(){

        document.querySelector(".modal").style.display = "flex";


    }
    
    let myBoard = gameBoard();

    let moveCount = 0;
    

    let player1Name = document.querySelector('input[name = "firstName"]');
    let player2Name = document.querySelector('input[name = "secondName"]');

    if(player1Name.value.length === 0){
        player1Name = player1Name.placeholder;
    }
    else{
        player1Name = player1Name.value;
    }
    
    
    if(player2Name.value.length === 0){
        player2Name = player2Name.placeholder;
    }
    else{
        player2Name = player2Name.value;
    }


   

    console.log(player1Name);

    Player1 = Player(player1Name, "X");
    Player2 = Player(player2Name, "O");

    currentPlayer = null;


    function checkGame(){
       
        // 0=1=2 
       if(myBoard.array[0].getContent() === myBoard.array[1].getContent() 
        && myBoard.array[2].getContent() ===myBoard.array[0].getContent()
        &&myBoard.array[0].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
       }
       
    //    0=4=8
       if(myBoard.array[0].getContent() === myBoard.array[4].getContent() 
        && myBoard.array[8].getContent() ===myBoard.array[0].getContent()
        && myBoard.array[0].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
       }
       
    //    0=3=6
       if(myBoard.array[0].getContent() === myBoard.array[3].getContent() 
        && myBoard.array[6].getContent() ===myBoard.array[0].getContent()
        && myBoard.array[0].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }
       
    //    1=4=7
       if(myBoard.array[1].getContent() === myBoard.array[4].getContent() 
        && myBoard.array[7].getContent() ===myBoard.array[1].getContent()
        && myBoard.array[1].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }
        
    //    2 = 4= 6
       if(myBoard.array[2].getContent() === myBoard.array[4].getContent() 
        && myBoard.array[6].getContent() ===myBoard.array[2].getContent()
        &&myBoard.array[2].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }
        
// 2 = 5=8
       if(myBoard.array[2].getContent() === myBoard.array[5].getContent() 
        && myBoard.array[8].getContent() ===myBoard.array[2].getContent()
        &&myBoard.array[2].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }
       
    //    3 = 4 =5
       if(myBoard.array[3].getContent() === myBoard.array[4].getContent() 
        && myBoard.array[5].getContent() ===myBoard.array[3].getContent()
        && myBoard.array[3].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }
       
    //    6 = 7= 8
       if(myBoard.array[6].getContent() === myBoard.array[7].getContent() 
        && myBoard.array[8].getContent() ===myBoard.array[6].getContent()
        && myBoard.array[6].state === Active){
           console.log(`${currentPlayer.getName()} wins`);
           endGame();
           return;
       }



       

       
       
       
       
        if(currentPlayer===Player1){
            currentPlayer = Player2;
        }
        else{
            currentPlayer = Player1;
        }

    }



    currentPlayer = Player1;
  
    console.log(`${currentPlayer.getName()}`);
    myBoard.array.forEach(element => {
        
        element.point.addEventListener("click", function(){
          
            if(element.state){
                console.log(element.state);
                return;
            }
                
            element.draw(currentPlayer.getTeam());
              checkGame();
        });
    })

    // return{Player1, Player2, myBoard};


}





const grid = () =>{

    let point = document.createElement("div");
    let number = ++num;
    let state = Inactive;
    
    const getContent =()=> point.textContent;



function draw(string){
    
    this.state = Active;
    this.point.textContent = string;
    
   
}
  
 

      

return {point, state, draw, getContent};


}



const gameBoard = () => {

    let array =[];

    for(i=0; i< 9; i++){
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


 return{board, array};
    // board.style.cssText = "border: 0.5px black solid";

}



const Player = (playerName, team) => {

  const getName = () => playerName;
  const getTeam = () => team;




return{getName, getTeam};

}