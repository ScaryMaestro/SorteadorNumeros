function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);
    let erro = false;
    let mensagemErro = '';
    let resultado = document.getElementById('resultado');

    if (isNaN(de) || isNaN(ate) || isNaN(quantidade)) {
        erro = true;
        mensagemErro = 'Preencha todos os campos com números válidos';
        alterarStatusBotao(false);
    } else if (quantidade < 1) {
        erro = true;
        mensagemErro = 'A quantidade de números deve ser maior que 0';
    } else if (de >= ate) {
        erro = true;
        mensagemErro = 'Verifique os valores nos campos "Do número" e "Até o número"';
    } else if (ate - de + 1 < quantidade) {
        erro = true;
        mensagemErro = 'A quantidade de números solicitada é maior do que o possível';
    }    

    if (erro == false) {
        let sorteados = [];
        let numero = obterNumeroAleatorio(de, ate);

        for (let i = 0; i < quantidade; i++) {
            while (sorteados.includes(numero)) {
                numero = obterNumeroAleatorio(de, ate);
            }
            sorteados.push(numero);
        }
        
        let textoResultado = quantidade > 1 ? 'Números sorteados' : 'Número sorteado';
        resultado.innerHTML = `<label class="texto__paragrafo">${textoResultado}: ${sorteados.join(' | ')}</label>`;
    } else {
        resultado.innerHTML = `<label class="texto__paragrafo">Erro: ${mensagemErro}</label>`;
    }

    alterarStatusBotao(true);
}

function reiniciar() {
    alterarStatusBotao(false);
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    resultado.innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao(status) {
    let botao = document.getElementById('btn-reiniciar');
    if (status == true) {
        if (botao.classList.contains('container__botao-desabilitado')) {
            botao.classList.remove('container__botao-desabilitado');
            botao.classList.add('container__botao');
        }
    } else {
        if (botao.classList.contains('container__botao')) {
            botao.classList.remove('container__botao');
            botao.classList.add('container__botao-desabilitado');
        }
    }
}
