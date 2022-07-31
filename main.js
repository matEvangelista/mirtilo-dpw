const respostas = ['bolo', 'mojito', 'milkshake', 'cheesecake'];
const imagens = ['img/bolo.png', 'img/mojito.png', 'img/milkshake.png', 'img/cheesecake.png']
let nomes = ['bolo', 'mojito', 'milkshake', 'cheesecake'];
let posicao = 0;

function clickable() {
    if (menuOpen) {
        menuBtn.classList.remove('open');
        sideBar.classList.remove('mostrar');
        menuOpen = false;
        document.getElementById("clicou").style.display = "none";
    }
    else {
        menuBtn.classList.add('open');
        sideBar.classList.add('mostrar');
        document.getElementById("clicou").style.display = "flex";
        menuOpen = true;
    }
}

function removeClicavel() {
    if (screen.width > 700) {
        document.getElementById("clicou").style.display = "none";
        menuOpen = false;
    }
}

function diferencaDias(data0, data1) {
    let difTempo = Math.abs(data0 - data1);
    return Math.ceil(difTempo / (1000 * 60 * 60 * 24));
}

function mudaImgAHA() {
    document.getElementById("aha").src = "img/aha-logo2.jpg";
}

function retornaImgAHA() {
    document.getElementById("aha").src = "img/aha-logo.jpg";
}

function mudaImgCerebro() {
    document.getElementById('cerebro').src = "img/cerebro2.jpg";
}

function retornaImgCerebro() {
    document.getElementById("cerebro").src = "img/cerebro.jpg"
}

function mudaImgDiabetes() {
    document.getElementById('diabetes').src = "img/diabetes2.jpg";
}

function retornaImgDiabetes() {
    document.getElementById("diabetes").src = "img/diabetes.jpeg"
}

function gera_calendario(ano) {
    var dias_semana = new Array('Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab');
    var meses_ano = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
    var qtde_dias_mes = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var calendario = new Date();
    var num_dias_semana = 7;
    var cal;
    var ano = calendario.getFullYear();
    var mes = calendario.getMonth();
    var dia_hoje = calendario.getDate();
    var TR_start = '<TR>';
    var TR_end = '</TR>';
    var TD_start = '<TD BORDER=0 WIDTH=30><CENTER>';
    var TD_end = '</CENTER></TD>';
    var red_start = '<TD BORDER=1 WIDTH=30 BGCOLOR=c434fd ALIGN=CENTER>';
    var red_end = '</TD>';

    if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)))
        qtde_dias_mes[1] = 29;

    cal = '';

    cal += '<div class="row">' + '<div class="col">';

    calendario.setDate(1);
    calendario.setMonth(mes);
    calendario.setUTCFullYear(ano);

    cal += '<TABLE BORDER=1><TR><TD><TABLE BORDER=0 CELLSPACING=5>' + TR_start;
    cal += '<TD COLSPAN="' + num_dias_semana + '" BGCOLOR="#EFEFEF"><CENTER><B>';
    cal += meses_ano[mes] + '   ' + ano + '</B>' + TD_end + TR_end;
    cal += TR_start;

    for (i = 0; i < num_dias_semana; i++)
        cal += TD_start + '<B>' + dias_semana[i] + '</B>' + TD_end;
    cal += TD_end + TR_end;

    cal += TR_start;
    dia = 0;
    for (i = 0; i < calendario.getDay(); i++) {
        cal += TD_start + '  ' + TD_end;
        dia++;
    }
    for (i = 1; i <= qtde_dias_mes[mes]; i++) {
        if (dia == 0)
            cal += TR_start;
        if (i == dia_hoje)
            cal += red_start + i + red_end;
        else
            cal += TD_start + i + TD_end;
        dia++;
        if (dia == num_dias_semana) {
            cal += TR_end;
            dia = 0;
        }
    }
    cal += '</TABLE></TABLE></div>';
    document.getElementById('calendario').innerHTML = cal;
}

function somaSlides(n) {
    mostraSlides(slideIndex += n);
}

function slideAtual(n) {
    mostraSlides(slideIndex = n);
}

function mostraSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length)
        slideIndex = 1
    if (n < 1)
        slideIndex = slides.length
    for (i = 0; i < slides.length; i++)
        slides[i].style.display = "none";
    for (i = 0; i < dots.length; i++)
        dots[i].className = dots[i].className.replace(" active", "");
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function mostraCoisas() {
    let indice = Math.floor(Math.random() * 4); // varia de 0 a 3
    let img = document.getElementById('imagem');
    img.src = imagens[indice];
    posicao = indice;
}

function resposta() {
    let i = posicao;
    let resp = document.getElementsByTagName('input')[0].value
    if (resp == '')
        alert('Você precisa digitar algo')
    else if (nomes.indexOf(resp) == i) {
        document.getElementById('resposta').innerHTML = "Parabéns, você acertou";
        document.getElementById('resposta').style.color = "green";
    }
    else {
        document.getElementById('resposta').innerHTML = "Você errou.<br>A resposta correta é " + nomes[i];
        document.getElementById('resposta').style.color = "red";
    }
    document.getElementById('link').style.display = "block"
}

function resultadoQuiz() {
    var nomes = []
    for (let i = 0; i < 11; i++)
        nomes.push('questao-' + (i + 1))
    var soma = 0;

    for (let j = 0; j < 11; j++) {
        var ele = document.getElementsByName(nomes[j]);
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked && ele[i].value == 'certo')
                soma++;
        }
    }
    alert("Você acertou " + soma + " resposta(s)");
}

var caminho = window.location.pathname;
var page = caminho.split("/").pop();
let slideIndex = 1;
if (page == "index.html")
    gera_calendario();
else if (page == "historia.html") {
    mostraSlides(slideIndex);
    const hoje = new Date();
    const datas = [new Date(1871, 9, 5), new Date(1867, 2, 23)]; // data de nascimento de E. White e F. Covile
    if (hoje.getDate() == 7 && hoje.getMonth() == 8) {
        document.getElementById('brasil').style.display = 'flex';
        document.body.style.backgroundColor = "green"
    }
    for (let i = 0; i < 2; i++)
        document.getElementsByClassName("aniversario")[i].innerHTML = diferencaDias(hoje, datas[i]);
}
else if (page == 'jogo.html')
    var opcao = mostraCoisas();

const menuBtn = document.querySelector('.menu-btn');
const sideBar = document.querySelector('.inicio');
let menuOpen = false;
menuBtn.addEventListener('click', clickable);