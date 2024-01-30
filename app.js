let listaDeNumerosSorteados = [];
let max = 10;
let tentativas = 1;
const gerarNumero = () => {
    let numeroGerado = Math.floor(Math.random() * max) + 1;
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if(quantidadeDeElementos == max){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroGerado)){
        return gerarNumero();
    }else{
        listaDeNumerosSorteados.push(numeroGerado);
        return numeroGerado;
    }
}
let numeroSecreto = gerarNumero();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

exibirMensagemInicial();

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector("input").value;    
    let plural = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemFinal = `Você descobriu o número secreto com ${tentativas} ${plural}`
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns, você acertou!");
        exibirTextoNaTela("p", mensagemFinal);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        (chute > numeroSecreto) ? exibirTextoNaTela("p", "Número secreto é menor que o chute!") : exibirTextoNaTela("p", "Número secreto é maior que o chute!");
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}


