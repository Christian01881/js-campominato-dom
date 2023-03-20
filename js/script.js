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
    const NUM_BOMBS = 16;
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
function play(e) {
    e.preventDefault();
    const difficulty = document.getElementById('Difficulty').value;
    console.log(difficulty);

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
    };
    const bomb = genBombs(cellNumbers);
    console.log(bomb);
    console.log(cellNumbers);
    let cellPerRow = Math.sqrt(cellNumbers);
    console.log(cellPerRow);

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
            if(bomb.includes(parseInt(cell.innerText)) === true){
                for(j = 0; j < bomb.length; j++){
                    if(bomb[j] === parseInt(cell.innerText)) cell.classList.add('CPM-bg-Bombs')
                    console.log(bomb[j])
                }   
            }   
        });
    };
};



// MAIN
const levelSelect = document.getElementById('LevelSelect');
levelSelect.addEventListener('submit', play);



