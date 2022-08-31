const playBtn = document.querySelector('#play_btn');
const cellElements = document.querySelectorAll('.cell')
const winner_message = document.querySelector('.winner_mess')
const winner_box = document.querySelector('.winner')
const restartBtn = document.querySelector('.restart')


const class_x = 'x';
const class_o = 'o'   
let flag;
let curr_step;
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

playGame()

function playGame(){cellElements.forEach(cell=>{
    flag = false;
    cell.addEventListener('click', game, {once: true})
    winner_box.style.display = "none"
    cell.classList.remove(class_x)
    cell.classList.remove(class_o)
})
}

function Players(player_name){
    this.player_name = player_name;
}

playBtn.addEventListener('click', e=>{
    if(document.querySelector('#player1').value && document.querySelector('#player2').value){
        enterGame();
    }
})

function enterGame(){
    document.querySelector('.start-screen').style.display = "none";
    document.querySelector('.container').style.display = "block";
}

function game(e){
    let player1 = new Players(document.querySelector('#player1').value);
    let player2  = new Players(document.querySelector('#player2').value);
    flag = !flag
    player1.x = player1.player_name
    player2.o = player2.player_name
    const cell = e.target;

    curr_step = flag? class_x : class_o;
    toggleStep(cell, curr_step);    

    if(checkWinner(curr_step)){
        winner_box.style.display = "flex";
        curr_step == 'x'? winner_message.innerHTML = `${player1[curr_step]} is winner!`: winner_message.innerHTML = `${player2[curr_step]} is winner!`
    }
    else if (draw()){
        winner_box.style.display = "flex";
        winner_message.innerHTML = "Tie!"
    }


}

function toggleStep(cell, curr_step){
    cell.classList.add(curr_step)
}

function checkWinner(step){
    return winningCombinations.some(combo => {
        return combo.every(el=>{
            return cellElements[el].classList[1] === step;
        })
    })
}

function draw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(class_x) || cell.classList.contains(class_o);

    })
}

restartBtn.addEventListener('click', playGame)

