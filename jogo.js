/*CRIAÇÂO*/

let estrutura = document.getElementById("jogo");
let contexto = estrutura.getContext("2d");//visao do game
let bloco = 32;//tamanho de um bloco
let cobra = [];

cobra[0] = {
    x: 8 * bloco,
    y: 8 * bloco
}

let direcao = "direita";
let qntRango = {
    x: Math.floor(Math.random() * 15 + 1 ) * bloco,
    y: Math.floor(Math.random() * 15 + 1 ) * bloco
}




/*FUNÇÕES*/

function randCor(){
    let cor = Math.floor(Math.random() * 9);
    if(cor == 1) return "red";
    if(cor == 2) return "blue";
    if(cor == 3) return "green";
    if(cor == 4) return "magenta";
    if(cor == 5) return "orange";
    if(cor == 6) return "purple";
    if(cor == 7) return "brown";
    if(cor == 8) return "black";
}

function fundo(){
    contexto.fillStyle = "black";//cor do fundo
    contexto.fillRect(0, 0, 16 * bloco, 16 * bloco);//quantidade de blocos em largura e altura
}

function nascimentoCobra(){
    for(i=0; i<cobra.length; i++){
        contexto.fillStyle = "beige";
        contexto.fillRect(cobra[i].x, cobra[i].y, bloco, bloco);
    }
}

function rango(){
    contexto.fillStyle = "white"
    contexto.fillRect(qntRango.x, qntRango.y, bloco, bloco)
}

document.addEventListener('keydown', trocaLado);

function trocaLado (usado) {
    if(usado.keyCode == 37 && direcao != "direita") direcao = "esquerda";
    if(usado.keyCode == 38 && direcao != "baixo") direcao = "cima";
    if(usado.keyCode == 39 && direcao != "esquerda") direcao = "direita";
    if(usado.keyCode == 40 && direcao != "cima") direcao = "baixo";
}


/*SHOWTIME*/
function jogar() {
    
    if(cobra[0].x > 15 * bloco && direcao == "direita") cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == "esquerda") cobra[0].x = 16 * bloco;
    if(cobra[0].y > 15 * bloco && direcao == "baixo") cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == "cima") cobra[0].y = 16 * bloco;

    for(i=1; i<cobra.length; i++)
    {
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(tempoJogo);
            alert('Game Over! X.X  Pressione F5 para jogar novamente.' );
        }
    }

    fundo();
    nascimentoCobra();
    rango()
    
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direcao == "direita") cobraX += bloco;
    if(direcao == "esquerda") cobraX -= bloco;
    if(direcao == "cima") cobraY -= bloco;
    if(direcao == "baixo") cobraY += bloco;

    if(cobraX != qntRango.x || cobraY != qntRango.y){
        cobra.pop();
    }
    else{
        qntRango.x = Math.floor(Math.random() * 15 + 1) * bloco;
        qntRango.y = Math.floor(Math.random() * 15 + 1) * bloco;
    }

    let cabeca ={
        x: cobraX,
        y: cobraY
    }
    cobra.unshift(cabeca);
    document.body.style.backgroundColor = randCor();
}

let tempoJogo = setInterval(jogar, 100);