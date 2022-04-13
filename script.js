let order = [];
let clickedOrder = [];
let score = 0;

const start = document.querySelector('.initialText');

var sound = new Audio();
var soundPath = ['src/music1.mp3', 'src/music2.mp3', 'src/music3.mp3', 'src/musica4.mp3'];

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//sorteia numero da cor a ser clicada e chama função acende cor
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    //adiciona valor sorteado a sequencia esperada e atribui a classe css relacionada (grid area) que deverá ser clicada
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);

    }
}

//acende a (grid area) próxima cor
let lightColor = (element, number) => {

    let i = number - 1;

    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
        console.log(order[i]);
        console.log(element);
        sound.src = soundPath[order[i]];
        console.log(soundPath[order[i]]);

        sound.play();
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        score++;
        alert(`Pontuação: ${score}!\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//função para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    console.log(color);
    sound.src = soundPath[color];
    sound.play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//função para o próximo nível do jogo
let nextLevel = () => {
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();

}

//função de inicia o jogo
let playGame = () => {
    alert('Bem vindo ao BANANA BIRD \n Uma remontagem do clássico Donkey Kong Contry 3! \n Iniciando novo jogo!');
    score = 0;
    //nextLevel();
    shuffleOrder();

}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
//playGame();
start.addEventListener('click', () => {
    playGame();
})