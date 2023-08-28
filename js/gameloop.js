// Main Loop
const mario = document.querySelector('.mario');                         // Mario
const pipe = document.querySelector('.pipe');                           // Cano
const clouds = document.querySelectorAll('.clouds');                    // Nuvens
const coin = document.querySelector('.coin');                           // Coin
const yoshi = document.querySelector('.yoshi');                         // Yoshi Montaria
const yoshicoin = document.querySelector('.yoshicoin');                 // Yoshicoin
// BOTÕES
const pauseButton = document.querySelector('.pauseButton');             // Botão Pause/Configurações
const startButton = document.getElementById("start-button");            // Botão Iniciar Jogo
const restartButton = document.getElementById("restart-button");        // Botão Reiniciar Jogo
const xButton = document.getElementById("xButton");                     // Botão Fecha Menu
const aMcontroles = document.getElementById("aMcontroles");             // Botão Abre Sub-Menu Controles
const aMsom = document.getElementById("aMsom");                         // Botão Abre Sub-Menu Controles
const okButtonM = document.getElementById("okButtonM");                 // Botão Confirma Menu Principal
const okButtonS = document.getElementById("okButtonS");                 // Botão Confirma Menu Som
const okButtonC = document.getElementById("okButtonC");                 // Botão Confirma Menu Controles
// TELA
const startScreen = document.getElementById("start-screen");            // Tela Principal
const gameoverscreen = document.getElementById("gameover-screen");      // Tela Game Over
const configscreen = document.getElementById("config-screen");          // Tela Menu Ajustes
const configContainer = document.getElementById("configContainer");     // Tela Menu Ajustes Reajuste Tamanaho
const cfgMain = document.getElementById("cfgMain");                     // Tela Menu Ajustes Page Main
const cfgControls = document.getElementById("cfgControls");             // Tela Menu Ajustes Page Botões
const cfgSounds = document.getElementById("cfgSounds");                 // Tela Menu Ajustes Page Volume
// ELEMENTOS
const score = document.querySelector('.score');                         // Score
const scoreElements = document.querySelectorAll('.score span');         // Clona Score Game Over
const scoreElement = document.querySelector('.score');                  // Contador Score
const coinsElement = document.querySelector('.coins');                  // Contador Coins
const Ycoin = document.querySelector('.Ycoin');                         // Icone Yoshi Coin
const YcoinElement = document.querySelector('.Ycoin');                  // Contador Yoshi Coin
const barraMusic = document.getElementById('barraMusic');               // Barra Volume Musica
const progresso1 = document.getElementById('progresso1');               // Volume Efeitos
const cursorMusic = document.getElementById('cursorMusic');             // Curso Volume
const barraFx = document.getElementById('barraFx');                     // Barra Volume FX
const progresso2 = document.getElementById('progresso2');               // Volume FX
const cursorFx = document.getElementById('cursorFx');                   // Curso FX
const music = document.getElementById("music");                         // Musica Tema
const gameboard = document.getElementById("game-board");                // GAME BORD SCREEN MOBILE
//--------------------------------------------------
//-----------  Variáveis Game Functions ------------                                                                                                                              
//--------------------------------------------------
let isPaused = false;                // Variável Verifica se o jogador está no Pause
let isMenu = true;                   // Variável Verifica se o jogador está no Menu
let isGameOver = false;              // Variável para Rastrear se o jogo acabou
let musicPlay = true;                // Variável Musica Tema
let loop;                            // Loop Game
let count = 0;                       // Contador Score
let count1 = 0;                      // Contador Moedas
let count2 = 0;                      // Contador Yoshi Moeda
let alreadyJump = false;             // Variável Verifica se o Mario está pulando
let hasPassedPipe = false;           // Variável Verifica se o Mario passou pelo pipe
let isInvulnerable = false;          // Variável Modo Safe
let invulnerabilityTime = 3000;      // Tempo do Modo Safe (3 secundos)
let isColetedCoin = true;            // Variável Verifica se o jogador coletou a Coin
let isColetedYoshiCoin = true;       // Variável Verifica se o jogador coletou a Yoshi Coin
let isYoshi = false;                 // Variável Verifica se o Mario está com o Yoshi
let musicCurrentTime = 0;            // Tempo Inicial Musica
let emMovimentoMusic = false;        // Variável Barra Volume Musica
let emMovimentoFx = false;           // Variável Barra Volume Fx
let volumeMusica = 1.0;              // Volume inicial da música (1.0 representa o volume máximo)
let volumeEfeitosSonoros = 1.0;      // Volume inicial dos efeitos sonoros
let isMuted = false;                 // Rastreia se jogo está mutado
let isSoundMuted = false;            // Variável Som Mutado
//--------------------------------------------------
//---------------- Game Functions  -----------------                                                                                                                              
//--------------------------------------------------
// Volume Sistem 
function atualizarProgresso(barra, progresso, cursor, event) {
    const emMovimento = barra.getAttribute('data-emMovimento') === 'true';

    if (emMovimento) {
        const mouseX = event.clientX - barra.getBoundingClientRect().left;
        const larguraBarra = barra.clientWidth;
        let novoProgresso = (mouseX / larguraBarra) * 100;

        if (novoProgresso < 0) {
            novoProgresso = 0;
        } else if (novoProgresso > 100) {
            novoProgresso = 100;
        }

        progresso.style.width = `${novoProgresso}%`;
        cursor.style.left = `${novoProgresso}%`;

        if (barra === barraMusic) {
            volumeMusica = novoProgresso / 100;                                 // Converta o progresso para uma escala de 0 a 1
        } else if (barra === barraFx) {
            volumeEfeitosSonoros = novoProgresso / 100;                         // Converta o progresso para uma escala de 0 a 1
        }
        ajustarVolumeSons();
    }
}
// EFEITOS SONOROS
function startMusic() {                                                         // Iniciar Musica
    var music = document.getElementById("music");                               //
    music.play();                                                               //
    music.currentTime = 0;                                                      //
}                                                                               //
function playMusic(pause) {                                                     // PLAY / PAUSE FUNÇÃO
    if (pause) {                                                                //
        music.pause();                                                          // 
        musicPlay = true;                                                       //
        musicCurrentTime = music.currentTime;                                   // Armazena a posição atual da música
    } else {                                                                    //
        if (musicPlay) {                                                        //
            music.volume = volumeMusica;
            music.play();                                                       //
            music.currentTime = musicCurrentTime;                               // Restaura a posição da música
            musicPlay = false;                                                  //
        }                                                                       //
    }                                                                           //
}                                                                               //
function stopMusic() {                                                          // Para a Musica
    var music = document.getElementById("music");                               //
    music.pause();                                                              // 
    music.currentTime = 0;                                                      // Reinicia Duração 0 = STOP
}                                                                               //
function jumpSound() {                                                          // Sound Effect Jump
    var jumpSound = document.getElementById("jumpSound");                       //
    jumpSound.play();                                                           //
}                                                                               //
function coinColectSound() {                                                    // Sound Effect Collect Coin
    var coinColectSound = document.getElementById("coinColectSound");           //
    coinColectSound.play();                                                     //
}                                                                               //
function yoshiCoinColectSound() {                                               // Sound Effect Collect Yoshi Coin
    var yoshicoinColectSound = document.getElementById("yoshiCoinColectSound"); //
    yoshicoinColectSound.play();                                                //
}
function montYoshi() {                                                          // Sound Effect Jump
    var montYoshi = document.getElementById("montYoshi");                       //
    montYoshi.play();                                                           //
}
function mainMusic() {
    var music = document.getElementById("music");                               //
    music.src = "../sounds/music.mp3";                                          //
    music.load();
    music.play()
}
function yoshiMusic() {                                                         // Sound Effect Yoshi Music
    var music = document.getElementById("music");                               //
    music.src = "../sounds/music2.mp3";                                         //
    music.addEventListener("loadedmetadata", function () {
        music.play();
    });

    music.load();
}
function GameOverSound() {                                                      // Sound Effect Game Over
    var GameOverSound = document.getElementById("gameOverSound");               //
    GameOverSound.play();                                                       //
}                                                                               //
function muteSound() {                                                          // MUTE Sound Effect + Music Effect
    var jumpSound = document.getElementById("jumpSound");
    var coinColectSound = document.getElementById("coinColectSound");
    var music = document.getElementById("music");                               //
    var GameOverSound = document.getElementById("gameOverSound");
    var montYoshi = document.getElementById("montYoshi");
    var yoshiCoinColectSound = document.getElementById("yoshiCoinColectSound");
    isMuted = true;
    jumpSound.volume = 0;
    coinColectSound.volume = 0;
    music.volume = 0;
    GameOverSound.volume = 0;
    yoshiCoinColectSound.volume = 0;
    montYoshi.volume = 0;
}
function unMuteSound() {                                                        // Para a Musica
    var jumpSound = document.getElementById("jumpSound");
    var coinColectSound = document.getElementById("coinColectSound");;
    var music = document.getElementById("music");                               //
    var GameOverSound = document.getElementById("gameOverSound");
    var montYoshi = document.getElementById("montYoshi");
    var yoshiCoinColectSound = document.getElementById("yoshiCoinColectSound");
    isMuted = false;
    coinColectSound.volume = volumeEfeitosSonoros;  // Define o volume de volta para 1 (volume máximo)
    GameOverSound.volume = volumeEfeitosSonoros;
    music.volume = volumeMusica;
    jumpSound.volume = volumeEfeitosSonoros;
    yoshiCoinColectSound.volume = volumeEfeitosSonoros;
    montYoshi.volume = volumeEfeitosSonoros;


}
function ajustarVolumeSons() {
    const music = document.getElementById("music");
    const jumpSound = document.getElementById("jumpSound");
    const coinColectSound = document.getElementById("coinColectSound");
    const yoshiCoinColectSound = document.getElementById("yoshiCoinColectSound");
    const gameOverSound = document.getElementById("gameOverSound");
    const montYoshi = document.getElementById("montYoshi");
    music.volume = volumeMusica;
    jumpSound.volume = volumeEfeitosSonoros;
    coinColectSound.volume = volumeEfeitosSonoros;
    yoshiCoinColectSound.volume = volumeEfeitosSonoros;
    gameOverSound.volume = volumeEfeitosSonoros;
    montYoshi.volume = volumeEfeitosSonoros;
}
// Resetar AnimaçãoF
function resetAnimation() {
    pipe.style.display = 'none';
    coin.style.display = 'none';
    yoshicoin.style.display = 'none';
    yoshi.style.display = 'none';
    setTimeout(() => {
        pipe.style.display = 'block';
        coin.style.display = 'block';
        yoshicoin.style.display = 'block';
        restartCoinsAnimation();
        restartPipeAnimation();
    }, 1)
}
// PAUSA ANIMAÇÕES
function pausePipeAnimation() {                                                                                                                     //
    pipe.style.animationPlayState = 'paused';                                                                                                       // Redefina a propriedade de animação
}
// PAUSA ANIMAÇÕES
function pauseYoshiAnimation() {                                                                                                                    //
    yoshi.style.animationPlayState = 'paused';                                                                                                      // Redefina a propriedade de animação
}                                                                                                                                                   //
function pauseCloudsAnimation() {                                                                                                                   //
    document.querySelectorAll('.clouds').forEach(cloud => cloud.style.animationPlayState = 'paused');                                               //
}                                                                                                                                                   //
function pauseCoinAnimation() {                                                                                                                     //
    coin.style.animationPlayState = 'paused';                                                                                                       // Redefina a propriedade de animação da moeda
    yoshicoin.style.animationPlayState = 'paused';                                                                                                  // Redefina a propriedade de animação da moeda Yoshi (se aplicável)
}
// REINICIA ANIMAÇÕES
function restartPipeAnimation() {                                                                                                                   //
    pipe.style.left = '';                                                                                                                           // Redefine Posição
    pipe.style.animation = 'pipe-animation 2s linear infinite';                                                                                     // Redefine Estilo Animação
    pipe.style.animationPlayState = 'running';                                                                                                      // Redefina Estado Animação
}
function restartYoshiAnimation() {                                                                                                                  //
    yoshi.style.left = '';                                                                                                                          // Redefine Posição
    yoshi.style.animation = 'launchYoshi 600ms ease-out forwards, yoshi-jump 600ms linear infinite, yoshi-return 20s linear infinite';                                                                                     // Redefine Estilo Animação
    yoshi.style.animationPlayState = 'running';                                                                                                     // Redefina Estado Animação
}                                                                                                                                                   //
function restartCloudsAnimation() {                                                                                                                 //
    clouds.forEach(cloud => {                                                                                                                       //
        cloud.style.left = '';                                                                                                                      // Redefine Posição
        cloud.style.animationPlayState = 'running';                                                                                                 // Redefina Estado Animação
    });                                                                                                                                             //
}                                                                                                                                                   //
function restartCoinsAnimation() {                                                                                                                  //
    coin.style.left = '';                                                                                                                           // Redefine Posição
    coin.style.animation = 'coin-animation 5s infinite linear, coin-animation-2 1s infinite linear, coin-animation-3 4.5s linear infinite';         // Redefine Estilo Animação
    coin.style.animationPlayState = 'running';                                                                                                      // Redefina Estado Animação
    yoshicoin.style.left = '';                                                                                                                      // Redefine Posição
    yoshicoin.style.animation = 'coin-animation-1 120s infinite linear, coin-animation-2 1s infinite linear, coin-animation-3 4.5s linear infinite';  //
    yoshicoin.style.animationPlayState = 'running'                                                                                                  //
}                                                                                                                                                   //
function ativarInvulnerabilidade() {                                                                                                                // 3 Segundos Sem Danos Após Colisão com Yoshi Mode
    isInvulnerable = true;     
    alreadyJump = true;                                                                                                                             // Modo Safe Ativado
    mario.style.animation = 'noclip 0.4s infinite';                                                                                                 // Animação Piscar Modo Safe
    setTimeout(() => {                                                                                                                              // Delay 3 Segundos Animação e Modo Safe
        mario.style.animation = '';                                                                                                                 // Reseta Animação Padrão Mario
        alreadyJump = false;
        isInvulnerable = false;                                                                                                                     // Desativa Modo Safe
    }, invulnerabilityTime);                                                                                                                        // Variavél Tempo Modo Safe
}
// GAME MODE                                                                                                                             
function modoMario() {
    montYoshi();                                                                                            // Sound Effect Desmontar do Yoshi
    isYoshi = false;                                                                                        // MODO YOSHI DESATIVADO
    mario.src = '../imagens/mario.gif';                                                                     // MARIO IMG PADRÃO
    mario.style.width = '150px';                                                                            // MARIO IMG PADRÃO REAJUSTE 
    mario.style.left = '0px';                                                                               // MARIO IMG PADRÃO REAJUSTE LEFT
    yoshicoin.style.display = 'block';                                                                      // LIBERA YOSHI COIN SPAWN
    mainMusic();                                                                                            // MUSICA TEMA PADRÃO
    playMusic(true);                                                                                        // Musica TEMA PLAY
    ativarInvulnerabilidade();                                                                              // MODO SAFE APOS COLISÃO 3 SEGUNDOS
    yoshi.style.display = 'block';                                                                          // MOSTRA YOSHI SOLO
    yoshi.style.animationPlayState = 'running';                                                             // ANIMAÇÃO PLAY YOSHI SOLO
    yoshi.style.animation = 'launchYoshi 600ms ease-out forwards';                                          // ANIMAÇÃO ISOLAR YOSHI SOLO
    setTimeout(() => {                                                                                      // DELAY
        yoshi.style.animation = 'none';                                                                     // REMOVE ANIMAÇÃO ISOLAR YOSHI SOLO
        yoshi.style.left = '620px';                                                                         // REAJUSTA POSIÇÃO YOSHI
        yoshi.style.animation = 'yoshi-jump 600ms linear infinite, yoshi-return 20s linear forwards';       // ADICIONA ANIMAÇÃO YOSHI OCIOSO E RETORNANDO AO MARIO
        yoshi.style.animationPlayState = 'running';                                                         // INICIA ANIMAÇÃO 
    }, 650);                                                                                                // DELAY
}
function modoYoshi() {
    isYoshi = true;                            // MODO YOSHI ATIVADO
    mario.src = '../imagens/marioyoshi.gif';   // MARIO YOSHI IMG
    mario.style.width = '190px';               // REAJUSTE MARIO YOSHI
    mario.style.left = '-20px';                // REAJUSTE LEFT MARIO YOSHI
    YcoinElement.style.visibility = "hidden";  // OCULTA ICONE MOEDA YOSHI 
    count2 = 0;                                // GASTA A MOEDA
    yoshicoin.style.display = 'none';          // SOME A MOEDA DA TELA
    montYoshi();                               // Sound Effect Montar Yoshi
    yoshiMusic();                              // MUDA MUSICA YOSHI TEMA
    playMusic(true);                           // PLAY MUSIC
}
//--------------------------------------------------
//------------------- Constantes -------------------                                                                                                                             
//--------------------------------------------------
const jump = () => {
    if (!isMenu && !alreadyJump) {
        mario.classList.add('jump');
        alreadyJump = true;
        jumpSound();
        setTimeout(() => {
            mario.classList.remove('jump');
            alreadyJump = false;
        }, 650);
    }
}
// Atualizar o Contador Coins na tela
const updateCoin = () => {
    coinsElement.textContent = `Coins: ${count1}`;
};
// Atualizar o Contador Coins na tela
const updateYoshiCoin = () => {
    YcoinElement.style.visibility = "visible";
};
// Atualizar o Contador Score na tela
const updateScore = () => {
    const scoreElements = document.querySelectorAll('.score span');                               // Selecionar ambos os elementos de score
    scoreElements.forEach((element) => {
        element.textContent = `Score: ${count}`;
    });
};
// Lógica Coletar Coin 
const checkCoin = () => {                                                                         //
    if (isColetedCoin) {                                                                          //
        const coinPositionLeft = +window.getComputedStyle(coin).left.replace('px', '');           // Posição do Left da Coin convertido em número
        const marioPositionBottom = +window.getComputedStyle(mario).bottom.replace('px', '');     //
        if (coinPositionLeft < 120 && marioPositionBottom < 140) {                                //
            count1++;                                                                             // Adiciona Contador +1
            updateCoin();                                                                         // Atualiza Contador +1
            coinColectSound();                                                                    // Sound Effect
            coin.style.display = 'none';                                                          // Visual Effect
            isColetedCoin = false;                                                                // Desabilita a detecção de colisões por um período (14 segundos)
            setTimeout(() => {                                                                    // Delay
                isColetedCoin = true;                                                             // Habilita a detecção de colisões novamente após o atraso
                coin.style.display = 'block';                                                     // Visual Effect
            }, 5000);                                                                             // Coloque o tempo da coin-animation aqui
        }                                                                                         //
    }                                                                                             //
};                                                                                                //
// Lógica Spanw 1 Yoshi Coin 
const oneYoshi = () => {
    if ((count2 === 1 && !isYoshi) || isYoshi) {
        yoshicoin.style.display = 'none';
    } else {
        yoshicoin.style.display = 'block';
    }
};
const checkYoshiCoin = () => {                                                                    //
    if (isColetedYoshiCoin && count2 === 0) {                                                     //
        const yoshicoinPositionLeft = +window.getComputedStyle(yoshicoin).left.replace('px', ''); // POSIÇÃO DA COIN EM RELAÇÃO A ESQUERDA
        const marioPositionBottom = +window.getComputedStyle(mario).bottom.replace('px', '');     // POSIÇÃO DO BOTTOM DA COIN CONVERTIDO EM NUMERO
        if (yoshicoinPositionLeft < 112 && marioPositionBottom < 160) {                           // POSIÇÃO COLISÃO MARIO E YOSHI COIN
            count2++;                                                                             // ADD 1 YOSHI COIN 
            updateYoshiCoin();                                                                    // Atualiza Contador +1
            yoshiCoinColectSound();                                                               // SOUND EFFECT
            YcoinElement.style.visibility = "visible";                                            // MOSTRA ICONE YOSHI COIN
            yoshicoin.style.display = 'none';                                                     // VISUAL EFFECT
            isColetedYoshiCoin = false;                                                           // DESABILITA A DETECÇÃO DE COLISÕES POR UM PERÍODO (14 SEGUNDOS)
            setTimeout(() => {                                                                    // DELAY
                isColetedYoshiCoin = true;                                                        // HABILITA A DETECÇÃO DE COLISÕES NOVAMENTE APÓS O ATRASO
                yoshicoin.style.display = 'block';                                                // VISUAL EFFECT
            }, 5000);                                                                             // COLOQUE O TEMPO DA COIN-ANIMATION AQUI + 4 SEGUNDOS DE MARGEM DE ERRO
        }                                                                                         //
    }                                                                                             //
};                                                                                                //
// Colisão Recuparar Yoshi
const checkYoshi = () => {                                                                        // 
    if (!isYoshi) {                                                                               //
        const yoshiPositionLeft = +window.getComputedStyle(yoshi).left.replace('px', '');         // POSIÇÃO DA COIN EM RELAÇÃO A ESQUERDA
        const marioPositionBottom = +window.getComputedStyle(mario).bottom.replace('px', '');     // POSIÇÃO DO BOTTOM DA COIN CONVERTIDO EM NUMERO
        if (yoshiPositionLeft < 83 && yoshiPositionLeft < 60 && marioPositionBottom < 125) {      // POSIÇÃO COLISÃO MARIO E YOSHI
            yoshi.style.display = 'none';                                                         // REMOVE YOSHI SOLO
            modoYoshi();                                                                          // SOUND EFFECT
            count2 = 1;                                                                           // ATUALIZA CONTADOR PRA IMPEDIR SPAWN DE YOSHI COIN
        }                                                                                         //
    }                                                                                             //
};
//--------------------------------------------------
//------------ Evento Mapeamento teclas ------------                                                                                                                              
//--------------------------------------------------
document.addEventListener("keydown", (e) => {
    if (!isPaused && !isMenu) {
        if (e.code === "ArrowUp" || e.code === "Space") {
            jump();
        }
    }
});
// Pular Mobile
gameboard.addEventListener("touchstart", () => {
    if (!isPaused && !isMenu) {
        jump();
    }
});
document.addEventListener("keydown", (e) => {
    if (!isPaused && !isYoshi && count2 === 1) {
        if (e.code === "KeyN") {
            modoYoshi();
        }
    }
});
document.addEventListener("keydown", (e) => {
    if (e.code === "KeyM") {
        isSoundMuted = !isSoundMuted;
        if (isSoundMuted) {
            muteSound();
        } else {
            unMuteSound(); 
        }
    }
});

//--------------------------------------------------
//-------------- Menu Start Configs ----------------                                                                                                                              
//--------------------------------------------------
if (isMenu) {
    pauseButton.innerHTML = '<i class="bx bxs-brightness" ></i>';       // MUDA PARA O ÍCONE DE PAUSA QUANDO O JOGO ESTIVER ATIVO
    gameoverscreen.style.display = 'none';                              // Oculte a tela de Score
    configscreen.style.display = 'none';                                // Oculte a tela de Ajustes
    score.style.display = 'none';                                       // Oculta Contador de Score
    coinsElement.style.display = 'none';                                // Oculta Contador de Coins
    YcoinElement.style.visibility = "hidden";                           // Oculta Yoshi Icon
    yoshi.style.display = 'none';                                       // Oculta Yoshi
    pipe.style.display = 'none';                                        // Oculta Cano
    coin.style.display = 'none';                                        // Oculta Coin
    yoshicoin.style.display = 'none';                                   // Oculta Yoshi Coin
    mario.src = '../imagens/marioAFK.png';                              // Mario Parado
    mario.style.width = '112px';                                        // Mario Parado Redicionamento
    mario.style.left = '35px';                                          // Mario Parado Correção Left
    pausePipeAnimation();                                               // Pausa Animação
    pauseCoinAnimation();                                               // Pausa Animação
    pauseYoshiAnimation();                                              // Pausa Animação
}
//--------------------------------------------------
//--------------------  Botões ---------------------                                                                                                                              
//--------------------------------------------------

// Start Game
startButton.addEventListener("click", () => {                           // Evento Iniciar Botão
    isMenu = false;                                                     // Jogador não está no Menu
    isPaused = false;                                                   // Reseta Pause Mode
    startScreen.style.display = 'none';                                 // Oculte a tela de início
    pauseButton.innerHTML = '<i class="bx bx-pause-circle" ></i>';      // Troca Icone Configuração para Pause
    pauseButton.style.display = '';                                     // Mostra Botão de Pausa
    score.style.display = '';                                           // Mostra Contador de Score
    coinsElement.style.display = '';                                    // Mostra Contador de Moedas
    pipe.style.display = '';                                            // Ativa Cano
    coin.style.display = '';                                            // Ativa Coin
    yoshicoin.style.display = '';                                       // Ativa Yoshi Coin
    mario.src = '../imagens/mario.gif';                                 // Mario Play
    mario.style.width = '150px';                                        // Mario Play Redicionamento
    mario.style.left = '0px';                                           // Mario Play Correção Left
    YcoinElement.style.visibility = "hidden";                           // Oculta Icone Yoshi Coin
    restartPipeAnimation();                                             // Reinicia Animações
    restartCoinsAnimation();                                            // Reinicia Animações
    if (!isMuted) {                                                     // Se não estiver mutado reinicia musica
        startMusic()                                                    // Inicia Musica
        ajustarVolumeSons();                                            // Verifica e Reajusta Volumes
    }
});
// Restart Game 
restartButton.addEventListener("click", () => {     // Evento Reseta Button
    restartGame();                                  // Função Reseta Game
});                                                 //
function restartGame() {                            // Reseta Game
    loop = setInterval(gameLoop, 200);              // INICIA NOVAMENTE O LOOP DO JOGO
    count = 0;                                      // Zera Score
    count1 = 0;                                     // Zera Coins
    count2 = 0;                                     // Zera Yoshi Coin
    updateScore();                                  // Atualiza Score 
    updateCoin();                                   // Atualiza Coins
    mario.src = '../imagens/mario.gif';             // Mario Game Over Reset Personagem
    mario.style.width = '150px';                    // Mario Game Over Reset Tamanho
    mario.style.left = '0px';                       // Mario Game Over Reset Posição Esquerda
    mario.style.animation = '';                     // Reseta Animação Mario
    resetAnimation();                               // Reseta Animações
    pauseButton.style.display = '';                 // Mostra Botão de Pausa
    score.style.display = '';                       // Mostra Contador de Score
    coinsElement.style.display = '';                // Mostra Contador de Coins
    gameoverscreen.style.display = 'none';          // Oculte a tela de Score
    isMenu = false;                                 // Jogador não está no Menu
    isGameOver = false;                             // Reseta Gamer Over
    hasPassedPipe = false;                          // Reseta Variável Verifica se o Mario passou pelo pipe
    alreadyJump = false;                            // Reseta Variável Verifica se o Mario está pulando
    isInvulnerable = false;                         // Reseta Variável Modo Safe
    invulnerabilityTime = 3000;                     // Reseta Tempo do Modo Safe (3 secundos)
    isColetedCoin = true;                           // Reseta Variável para coletar somente 1 Coin por vez
    isColetedYoshiCoin = true;                      // Reseta Variável para coletar somente 1 Yoshi Coin por vez
    isYoshi = false;                                // Reseta Yoshi
    isPaused = false;                               // Reseta Pause Variável
    mainMusic();                                    // Retorna Musica Principal
    if (!isMuted) {                                 // Se não estiver mutado reinicia musica
        playMusic(false);                           // Reinicia Musica
        ajustarVolumeSons();                        // Verifica e Reajusta Volumes
    }
}
// Pause Game
pauseButton.addEventListener("click", () => {
    if (isMenu) { // Se o jogo estiver no menu, trate o botão de pausa como um botão de configurações
        startScreen.style.display = 'none';        // OCULTA TELA START
        cfgControls.style.display = 'none';        // Oculta Menu Controles
        cfgSounds.style.display = 'none';          // Oculta Menu Som
        pauseButton.style.display = 'none';        // OCULTA Botão Pause
        okButtonS.style.display = 'none';          // Oculta OK Button Som
        okButtonC.style.display = 'none';          // Oculta OK Button Controles
        configscreen.style.display = 'block';      // Mosta Menu Ajustes
        cfgMain.style.display = 'block';           // Mostra Main Menu
        configContainer.style.height = '310px';    // Rediciona Tamanho Menu
    } else {                                       // Se o jogo não estiver no menu, a lógica para pausar ou retomar o jogo permanece a mesma.
        if (isPaused) { // Se o jogo estiver pausado, retome-o
            isPaused = false;                                                // NÃO ESTÁ EM PAUSA                                        
            pauseButton.innerHTML = '<i class="bx bx-pause-circle" ></i>';   // MUDA PARA O ÍCONE DE PAUSA QUANDO O JOGO ESTIVER ATIVO
            // RETOMAR ANIMAÇÕES                                             //
            mario.classList.remove('paused');                                // REMOVE CLASS PAUSED
            restartPipeAnimation();                                          // RETORNA ANIMAÇÃO
            restartCloudsAnimation();                                        // RETORNA ANIMAÇÃO
            restartCoinsAnimation();                                         //
            restartYoshiAnimation();
            if (isYoshi) { // Se o jogo estiver no Modo Yoshi
                mario.src = '../imagens/marioyoshi.gif';    // Troque para a imagem do Mario com Yoshi quando estiver no modo Yoshi
            } else {
                mario.src = '../imagens/mario.gif';         // Troque para a imagem do Mario em pausa
                mario.style.width = '150px';
                mario.style.left = '0px';
            }
            if (!isMuted) {                                 // Se não estiver mutado reinicia musica
                playMusic(false);                           // Reinicia Musica
                ajustarVolumeSons();                        // Verifica e Reajusta Volumes
            }
            loop = setInterval(gameLoop, 200);              // INICIA NOVAMENTE O LOOP DO JOGO
        } else {  // Se o jogo não estiver pausado, pause-o
            isPaused = true;                                // Jogo em pausa
            clearInterval(loop);                            // Interrompe o loop do jogo
            if (isYoshi) {
                mario.src = '../imagens/marioyoshiAFK.png'; // Troque para a imagem do Mario com Yoshi quando estiver no modo Yoshi
            } else {
                mario.src = '../imagens/marioAFK.png';      // Troque para a imagem do Mario em pausa
                mario.style.width = '112px';                // Reajust Width
                mario.style.left = '35px';                  // Reajust Left
            }
            cfgControls.style.display = 'none';             // Oculta Menu Controles
            cfgSounds.style.display = 'none';               // Oculta Menu Som
            pauseButton.style.display = 'none';             // OCULTA Botão Pause
            okButtonS.style.display = 'none';               // Oculta OK Button Som
            okButtonC.style.display = 'none';               // Oculta OK Button Controles
            configscreen.style.display = 'block';           // Mosta Menu Ajustes
            cfgMain.style.display = 'block';                // Mostra Main Menu
            configContainer.style.height = '310px';         // Rediciona Tamanho Menu
            // Pausa animações
            mario.classList.add('paused');
            pausePipeAnimation();
            pauseCloudsAnimation();
            pauseCoinAnimation();
            pauseYoshiAnimation();
            if (!isMuted) {                                 // Se não estiver mutado Pausa a musica
                playMusic(true);                           // Reinicia Musica
                ajustarVolumeSons();                        // Verifica e Reajusta Volumes
            }
        }
    }
});
// Menu Config X
xButton.addEventListener("click", () => {
    if (isMenu) {                                                           // SE ESTIVER NO MENU
        pauseButton.innerHTML = '<i class="bx bxs-brightness" ></i>';       // MUDA BOTÃO DE PAUSE PARA CONFIGURAÇÕES
        pauseButton.style.display = 'block';                                // Mostra Botão Configurações Menu
        configContainer.style.height = '450px';                             // REAJUSTA MENU
        configscreen.style.display = 'none';                                // ESCONDE CONFIG TELA
        cfgSounds.style.display = 'none'                                    // ESCONDE CONFIG SOUND
        cfgControls.style.display = 'none';                                 // ESCONDE CONFIG CONTROLS
        cfgMain.style.display = 'none';                                     // ESCONDE CONFIG MAIN
        startScreen.style.display = 'flex';                                 // MOSTRA TELA INICIAL

    } else {                                                                // SE NÃO ESTIVER NO MENU
        pauseButton.innerHTML = '<i class="bx bx-play-circle" ></i>';       // MUDA BOTÃO DE PAUSE PARA PLAY
        pauseButton.style.display = 'block';                                // MOSTRA BOTÃO DE PAUSE
        configContainer.style.height = '450px';                             // REAJUSTA MENU
        configscreen.style.display = 'none';                                // ESCONDE CONFIG TELA
        cfgSounds.style.display = 'none'                                    // ESCONDE CONFIG SOUND
        cfgControls.style.display = 'none';                                 // ESCONDE CONFIG CONTROLS
        cfgMain.style.display = 'none';                                     // ESCONDE CONFIG MAIN
    }
});
// Menu Config OK MAIN
okButtonM.addEventListener("click", () => {
    if (isMenu) {                                                       // SE ESTIVER NO MENU
        startScreen.style.display = 'flex';                             // MOSTRA TELA INICIAL
        configscreen.style.display = 'none';                            // ESCONDE CONFIG TELA
        pauseButton.innerHTML = '<i class="bx bxs-brightness" ></i>';   // MUDA BOTÃO PAUSE PARA CONFIGURAÇÕES
        pauseButton.style.display = 'block';                            // MOSTRA BOTÃO PAUSE
    } else {                                                            // SE NÃO ESTIVER NO MENU
        configscreen.style.display = 'none';                            // ESCONDE CONFIG TELA
        pauseButton.innerHTML = '<i class="bx bx-play-circle" ></i>';   // MUDA BOTÃO DE PAUSE PARA PLAY
        pauseButton.style.display = 'block';                            // MOSTRA BOTÃO DE PAUSE
        configContainer.style.height = '450px';                         // REAJUSTA MENU
        cfgSounds.style.display = 'none'                                // ESCONDE CONFIG SOUND
        cfgControls.style.display = 'none';                             // ESCONDE CONFIG CONTROLS
        cfgMain.style.display = 'none';                                 // ESCONDE CONFIG MAIN
    }
});
// Menu Config OK SOUND
okButtonS.addEventListener("click", () => {
    configContainer.style.height = '310px'                              // REAJUSTA MENU
    cfgControls.style.display = 'none';                                 // ESCONDE CONFIG CONTROLS
    cfgSounds.style.display = 'none';                                   // ESCONDE CONFIG SOUND
    cfgMain.style.display = 'block';                                    // MOSTRA CONFIG MAIN
    okButtonS.style.display = 'none';                                   // ESCONDE OK BUTTON SOUND
});
// Menu Config OK CONTROLS
okButtonC.addEventListener("click", () => {
    cfgControls.style.display = 'none';                                 // ESCONDE CONFIG CONTROLS
    cfgSounds.style.display = 'none';                                   // ESCONDE CONFIG SOUND
    configContainer.style.height = '310px'                              // REAJUSTA MENU
    cfgMain.style.display = 'block';                                    // MOSTRA CONFIG MAIN
    okButtonC.style.display = 'none';                                   // ESCONDE OK BUTTON CONTROLS
});
// Menu Config CONTROLE
aMcontroles.addEventListener("click", () => {
    cfgMain.style.display = 'none';                                     // ESCONDE CONFIG MAIN
    configContainer.style.height = '375px';                             // REAJUSTA MENU
    cfgControls.style.display = 'block';                                // MOSTRA CONFIG CONTROLS
    configscreen.style.display = 'block';                               // MOSTRA CONFIG TELA
    okButtonC.style.display = '';                                       // MOSTRA OK BUTTON CONTROLS
    okButtonC.style.marginTop = '35px';                                 // REAJUSTA BUTTON
});
// Menu Config SOM
aMsom.addEventListener("click", () => {
    cfgMain.style.display = 'none';                                     // ESCONDE CONFIG MAIN
    configContainer.style.height = '435px';                             // REAJUSTA MENU
    cfgSounds.style.display = 'flex';                                   // MOSTRA CONFIG SOUND
    okButtonS.style.display = '';                                       // MOSTRA OK BUTTON SOUND
    okButtonS.style.marginTop = '20px';                                 // REAJUSTA BUTTON
});
// Barra Musica
barraMusic.addEventListener('mousedown', () => {
    barraMusic.setAttribute('data-emMovimento', 'true');
    emMovimentoMusic = true;
    barraMusic.style.cursor = 'grabbing';
});
// Barra Efeitos Sonoros
barraFx.addEventListener('mousedown', () => {
    barraFx.setAttribute('data-emMovimento', 'true');
    emMovimentoFx = true;
    barraFx.style.cursor = 'grabbing';
});
// Mouse Move Bar
document.addEventListener('mouseup', () => {
    barraMusic.setAttribute('data-emMovimento', 'false');
    emMovimentoMusic = false;
    barraFx.setAttribute('data-emMovimento', 'false');
    emMovimentoFx = false;
    barraMusic.style.cursor = 'pointer';
    barraFx.style.cursor = 'pointer';
});
document.addEventListener('mousemove', (event) => {
    atualizarProgresso(barraMusic, progresso1, cursorMusic, event);
    atualizarProgresso(barraFx, progresso2, cursorFx, event);
});
//--------------------------------------------------
//-------------------- GAME LOOP -------------------                                                                                                                              
//--------------------------------------------------
const gameLoop = () => {
    if (!isPaused) {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const gameOverScoreElement = document.querySelector('.scoreGO span');
        oneYoshi();
        checkYoshi();
        checkCoin();
        checkYoshiCoin();
        updateScore();
        updateCoin();

        if (pipePosition <= 140 && pipePosition > 0 && marioPosition < 160 && !isInvulnerable) {
            if (isYoshi) {
                modoMario();
                // Se o modo Yoshi estiver ativado, ative o modo Mario em vez de tratar como game over
            } else {
                // Se não estiver no modo Yoshi, trate como game over normal
                isGameOver = true;
                isMenu = true;
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;
                mario.style.animation = 'none';
                mario.style.left = `${marioPosition}px`;
                mario.src = '../imagens/gameover.png';
                mario.style.animation = 'dead 500ms ease-out forwards';
                mario.style.width = '75px';
                mario.style.left = '54px';
                pauseCoinAnimation();
                pauseYoshiAnimation();
                stopMusic();
                GameOverSound();
                score.style.display = 'none';
                coinsElement.style.display = 'none';
                YcoinElement.style.visibility = "hidden";
                clearInterval(loop);
                updateScore();
                updateCoin();
                pauseButton.style.display = 'none';
                gameoverscreen.style.display = 'block';
                gameOverScoreElement.textContent = `Score: ${count}`;
            }
        }

        if (pipePosition < 140 && marioPosition > 160) {
            if (!hasPassedPipe) {
                count++;
                updateScore();
                hasPassedPipe = true;
            }
        } else {
            hasPassedPipe = false;
        }
    }
};

loop = setInterval(gameLoop, 200);

// Mobile

function rotateScreen() {
    if (window.orientation === 0) { // Orientação retrato
        screen.orientation.lock('portrait');
    } else if (window.orientation === 90 || window.orientation === -90) { // Orientação paisagem
        screen.orientation.lock('landscape');
    }
}

// Adicione um ouvinte de evento para a mudança de orientação
window.addEventListener('orientationchange', rotateScreen);

// Chame a função de rotação para configurar a orientação inicial
rotateScreen();