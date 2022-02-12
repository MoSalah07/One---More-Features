import SpeedTest from "/JS/inhret.js";
// Global Variables
const select = document.querySelector( '#options' );
const btnMsg = document.querySelector( '.btn-start-play' );
const input = document.querySelector( '#input' );
const screenRandomWord = document.querySelector( '.random-word' );
const containerWords = document.querySelector( '.main-words' );
const timeLeft = document.querySelector( '.time-left' );
const scoreCount = document.querySelector( '.score-count' );
const finish = document.querySelector( '.finish' );
const levels = {
    'hard': '2',
    'normal': '3',
    'easy': '5',
}

let testing = '';
select.addEventListener( 'change', selectedLevel);
// selectedLevel();
function selectedLevel(e) {
    const {hard, normal, easy } = levels;
    const levelGame = document.querySelector( '.type-game' );
    const secondsGame = document.querySelector( '.seconds-game' );
    // const select = document.querySelector( '#options' );

        screenRandomWord.innerHTML = '';
        input.value = '';
        input.focus();
        btnMsg.classList.add( 'hidden' );
        let optionsVal = e.target.value;
        switch(optionsVal) {
            case 'hard':
                levelGame.textContent = `[ ${optionsVal} ]`;
                secondsGame.textContent = `[ ${hard} ]`;
                break;
            case 'normal':
                levelGame.textContent = `[ ${ optionsVal} ]`;
                secondsGame.textContent = `[ ${normal} ]`;
                break;
            case 'easy':
                levelGame.textContent = `[ ${optionsVal} ]`;
                secondsGame.textContent = `[ ${easy} ]`;
                break;
        }
        genrateWords( optionsVal );
        testing = optionsVal;
}



// BtnMsg
btnMsg.addEventListener( 'click', buttonMsg );
function buttonMsg(e) {
    input.focus();
    this.remove();

    selectedLevel();
}

function genrateWords(level) {
    let randomWord = SpeedTest[`${level}`][Math.floor( Math.random() * SpeedTest[`${level}`].length )];
    screenRandomWord.textContent = randomWord;
    
    // Here Random Word => Is Removed From Array
    let wordIndex = SpeedTest[`${ level }`].indexOf( randomWord );
    SpeedTest[`${ level }`].splice( wordIndex, 1 );

    timeLeft.textContent = levels[`${ level }`];

    containerWords.innerHTML = '';
    // Loop For All Words
    SpeedTest[`${level}`].forEach((el) => {
        const div = document.createElement( 'div' );
        div.appendChild( document.createTextNode( el ) );
        containerWords.appendChild( div );
    });
    
    startPlay( SpeedTest[`${ level }`], levels[`${ level }`] );
}


function startPlay(arr, seconds) {
    finish.innerHTML = '';
    timeLeft.innerHTML = seconds;
    let start = setInterval(() => {
        timeLeft.textContent--;
        if (timeLeft.textContent === '0') {
            clearInterval( start );
            if (screenRandomWord.textContent.trim().toLowerCase() === input.value.trim().toLowerCase()) {
                input.value = '';
                scoreCount.textContent++;
                if(arr.length > 0) {
                    genrateWords( testing );
                } else {
                    let div = document.createElement( 'div' );
                    div.innerText = 'Good Man';
                    div.className = 'good';
                    finish.appendChild( div );
                    containerWords.remove();
                    scoreCount.textContent = '0';
                }
            } else {
                let div = document.createElement( 'div' );
                div.innerText = 'Game Over';
                div.className = 'bad';
                btnMsg.classList.remove( 'hidden' );
                finish.appendChild( div );
                scoreCount.textContent = '0';
                // Testing
                window.location.reload();
            }
        }


        if (timeLeft.textContent < '0') {
            timeLeft.textContent = '0';
            clearInterval( start );
        }
    }, 1000);
}