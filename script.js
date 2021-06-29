const selectionBox = document.querySelector('[data-selection-box]')
const selectXBtn = selectionBox.querySelector('[data-playerx]')
const  selectOBtn = selectionBox.querySelector('[data-playero]')
const container = document.getElementById('container')
const players = document.querySelector('.players')
let runBot = true

const cellElements = document.querySelectorAll('[data-cell]');
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn


let playerSign = "x"


startGame()


window.onload = () => 
{
for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].setAttribute("onclick", "clickedBox(this)");

}


    selectXBtn.onclick = () => {
        selectionBox.classList.add('hide');
        container.classList.add('show');
       circleTurn = false
    setBoardHoverClass()
       

      
    }
    selectOBtn.onclick = () => {
        selectionBox.classList.add('hide');
        container.classList.add('show');
       players.setAttribute("class", "players active player");
        circleTurn = true
         setBoardHoverClass()
        

}
}


function clickedBox(element) {
    // console.log(element);
    if(players.classList.contains("player")) {
        playerSign = "circle"
        element.innerHTML =`<i class ="${CIRCLE_CLASS}"></i>`;
        players.classList.remove("active")
        
        element.setAttribute("id", playerSign)

        } else{
            element.innerHTML =`<i class ="${X_CLASS}"></i>`
            players.classList.add("active")
            element.setAttribute("id", playerSign)
            
            
        }
        checkWin()
        let randomDelayTime = ((Math.random() * 1000) + 100).toFixed();
        // delay bots response time. Generates random response time
        setTimeout(() => {
            bot(runBot)
        }, randomDelayTime);
    
    }
        
        
    


function bot(runBot) {
    if(runBot) {
    playerSign = "circle"
    let array = [];
    for (let i = 0; i < cellElements.length; i++) {
        if(cellElements[i].childElementCount == 0) {
            array.push(i);

        }
        
     
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    console.log(randomBox);
    if(array.length > 0) {
        if(players.classList.contains("player")) {
            playerSign = "x"
            cellElements[randomBox].innerHTML = `<i class = ${X_CLASS}></i>`
            cellElements[randomBox].classList.add(X_CLASS);
            players.classList.add("active")
            cellElements[randomBox].setAttribute("id", playerSign)
            setBoardHoverClass()
            
        
            
            
            } else{
                cellElements[randomBox].innerHTML = `<i class= ${CIRCLE_CLASS}></i>`
                cellElements[randomBox].classList.add(CIRCLE_CLASS);
                players.classList.remove("active")
                cellElements[randomBox].setAttribute("id", playerSign)
                setBoardHoverClass()
                
            
            }
        }
            }
    }
   
playerSign = "x"


restartButton.onclick =() => {
    window.location.reload();
}

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleCell)
        cell.addEventListener('click', handleCell, {once: true})
        setBoardHoverClass()
        winningMessageElement.classList.remove('showw')
    })
    
}
function handleCell(e) {
    
    const cell = e.target
    
        const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        console.log(currentClass + 'winner')
        endGame(false) 
    
        }
         else if (isDraw()) {
            endGame(true)
        } else {
            setBoardHoverClass()
        }
        
        
  }

function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = "Draw!!!!"
        } else {
            winningMessageTextElement.innerText = `${circleTurn  ? "Player O": "Player X" } WINS!!!!`
            }
        winningMessageElement.classList.add('showw')
       
    
    }
         function isDraw() {
             return [...cellElements].every(cell => {
                 return cell.classList.contains(X_CLASS) || 
                 cell.classList.contains(CIRCLE_CLASS)
             })

             
         }


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass () {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}




function checkWin(playerSign) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(playerSign)
            
        

            

        })
    
        
    })  
    
}