/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

// Creo un Event submit che mi permette di selezionare il livello:
function genBombs(cellNumbers){
    const NUM_BOMBS = 15;
    const bombs = [];
    b = 0;
    while(bombs.length < NUM_BOMBS){
        randomBombs = Math.floor(Math.random() * cellNumbers) + 1;
        // controllare le posizioni dell'array se c'è un numero gia generato rigeneralo 
        if(bombs.includes(randomBombs) === false || b === 0){
            bombs[b] = randomBombs;
            b++;
        }
    }
    return bombs;
}

function setMessage(message){
    const score = document.getElementById('score');
    score.innerHTML = message;
}


function play(e) {
    e.preventDefault();
    const difficulty = document.getElementById('Difficulty').value;
    // console.log(difficulty);

    let message = 'Seleziona la difficoltà e premi play!';
    setMessage(message);
    let score = 0;
    let gameOver = false;
// Creo uno switch che cambia il numero di celle in base alla difficoltà:
    let cellNumbers;
    switch(difficulty){
        case 'Easy':
            cellNumbers = 100;
            break;
        case 'Medium':
            cellNumbers = 81;
            break;
        case 'Hard':
            cellNumbers = 49;
            break;
        case 'Dea Bendata':
            cellNumbers = 16;
            break
    };
    const bomb = genBombs(cellNumbers);
    // console.log(bomb);
    // console.log(cellNumbers);
    let cellPerRow = Math.sqrt(cellNumbers);
    // console.log(cellPerRow);
    const NUM_BOMBS = 15;
    let maxScore = cellNumbers - NUM_BOMBS;

// Creo un ciclo for per generare la scacchiera:
    const cellBox = document.querySelector('.CPM-box');
    cellBox.innerHTML = '';
    
    for(let i = 1; i <= cellNumbers; i++){
        let cell = document.createElement('div');
        cell.classList.add('CPM-cell');
        cell.style.width = `calc(100% / ${cellPerRow})`;
        cell.style.height = cell.style.width;
        cell.innerHTML = i;
        cellBox.appendChild(cell);

// Creo un evento che cambia il colore delle celle al click:
        cell.addEventListener('click', function(){
            if(!gameOver && !this.classList.contains('CPM-bg-blue')){
                if(bomb.includes(parseInt(this.innerText))){
                    this.classList.add('CPM-bg-Bombs');
                    message = `Hai perso! Ma hai totalizzato: ${score} punti`;
                    gameOver = true;
                    const cells = document.querySelectorAll('.CPM-cell');
                    for(let cell of cells){
                        if (bomb.includes(parseInt(cell.innerText))){
                            cell.classList.add('CPM-bg-Bombs')
                            cell.innerHTML = '<i class="fa-solid fa-bomb fs-4"></i>';
                        }
                    }
                } else{
                    this.classList.add('CPM-bg-blue');
                    score++;
                    message = score === maxScore ? `Hai vinto! Hai totalizzato: ${score} punti` : `Il tuo punteggio è: ${score}`;
                }
                setMessage(message);
            }
        });
    };
};



// MAIN
const levelSelect = document.getElementById('LevelSelect');
levelSelect.addEventListener('submit', play);



