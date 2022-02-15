	 
        // identificando o objeto de vídeo
        var video = document.getElementsByTagName("video")[0];
        
        var fullscreenbtn = document.getElementById('fullscreenbtn');
        
        var btnLegenda = document.getElementById("btnLegenda");	
        // desliga os controles default do navegador
        video.controls = false;
        // identificando o objeto botão play/pause 
        var ppbutton = document.getElementById("playpause");
                        
        var tempoAtual, tempoTotal, tempoVideoAtualizado;
        btnLegenda.innerHTML = "DESLIGADO";
        
        barraTempo.addEventListener("change", progressoBarra, false);
        btnLegenda.addEventListener("click", MostraLegenda, false);
        video.addEventListener("timeupdate", barraTempoAtualizacao, false);	
        // atualizando o video
        barraTempo = document.getElementById("barraTempo");
         
        tempoAtual = document.getElementById("tempoAtual");
        //identificando o tempo em que se encontra o video
        tempoTotal = document.getElementById("tempoTotal");				
        // tempo total do video
        
        // Adcionando eventlistener para mudar o valor entre play/pause quando o botão é acionado
        video.addEventListener('play', function() {
            ppbutton.title = "pause";
            ppbutton.innerHTML = "pause";
        }, false);
        video.addEventListener('pause', function() {
            ppbutton.title = "play";
            ppbutton.innerHTML = "play";
        }, false);
        // Adicionando um eventlistener na barra de progresso para atualiza-la
        //video.addEventListener('timeupdate', updateProgress, false);
        
        // Adicionar eventlistener para pausar o vídeo (que classifica o botão play / pause) quando termina o vídeo
        video.addEventListener('ended', function() { this.pause(); }, false);
        fullscreenbtn.addEventListener("click", toggleFullScreen, false);
        
        // para o video e reseta o tempo para 0
        function stopVideo() {
            video.pause();
            video.currentTime = 0;
            video.playbackRate= 1;
            zera();
            limpa();
        }
        
        // Alterna o botão play / pause entre reproduzir e pausar
        function PlayPause() {
            if (video.paused || video.ended) {
                if (video.ended) video.currentTime = 0;
                video.play();
                para();
                tempoPausa();
            }
            else {
                video.pause();
                    inicia();
                
            }
        }
        
        // controles de volume do video
        function MudaVolume(direction) {
            var volume = Math.floor(video.volume * 10) / 10;
            video.muted = false;
            if (direction == "-") {
                if (volume <= 0.1) video.volume = 0;
                else video.volume -= 0.1;
            }
            else {
                if (volume >= 0.9) video.volume = 1;
                else video.volume += 0.1;   
            }
        }
        
        // Alterna o valor mute do vídeo
        function Mute() {
            var mute = document.getElementById("mute");
            if (video.muted) {
                mute.innerHTML = "mute";
                video.muted = false;
            }
            else {
                mute.innerHTML = "unmute";
                video.muted = true;
            }
        }
        
        // Função Mostrar Legenda
        function MostraLegenda(){
        if (btnLegenda.innerHTML == "LIGADO"){
            btnLegenda.innerHTML = "DESLIGADO";
            legenda();
        }else{
            btnLegenda.innerHTML = "LIGADO";
            legenda();
        }				
    }
    
    

        // Alterando a velocidade de reprodução do video
        function MudaVelocidadePlayback(direction) {
            if (video.playbackRate != undefined) {
                if (direction == "-") video.playbackRate -= 1;
                else video.playbackRate += 1;
                //document.getElementById("teste").innerHTML=formatatempo(video.currentTime) + "<br>";
            }
            else {
                if (direction == "-") video.currentTime -= 1;
                else video.currentTime += 1;
               //document.getElementById("teste").innerHTML=formatatempo(video.currentTime) + "<br>;
            }
        }
        function toggleFullScreen() {
        if (video.requestFullScreen) {
            vid.requestFullScreen();

        } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();

        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        };
    }
    

//video.addEventListener("timeupdate", function() { 
 // function tempoPausa() { 
  //var TimeElapsed = document.getElementById('infoTempoPausa'); 
 // var seconds = parseInt(video.currentTime % 60); 
  //var minutes = parseInt((video.currentTime / 60) % 60); 
 // TimeElapsed.innerHTML = minutes + '.' + seconds + 'sec'; 
//} 


///ativa e desativa legenda
    var Subtitle;
    function legenda(){
    if(!Subtitle){
        video.textTracks[0].mode= "showing";
        console.log( video.textTracks)
    }else{
        video.textTracks[0].mode= "disabled";
    }
        Subtitle = !Subtitle;
    };
    
    
    
        function progressoBarra(){
        video.currentTime = video.duration * (barraTempo.value / 100);
        }
        
        function barraTempoAtualizacao(){
        var hora = "00:";
        var novoTempo = video.currentTime * (100 / video.duration);
        barraTempo.value = novoTempo;
        
        var minAtual = Math.floor(video.currentTime / 60);
        var segAtual = Math.floor(video.currentTime - minAtual * 60);
        var minDuracao = Math.floor(video.duration / 60);
        var segDuracao = Math.floor(video.duration - minDuracao * 60);
        if (segAtual < 10){segAtual = "0" + segAtual;}
        if (segDuracao < 10){segDuracao = "0" + segDuracao;}
        if (minAtual < 10){minAtual = "0" + minAtual;}
        if (minDuracao < 10){minDuracao = "0" + minDuracao;}
         
        tempoAtual.innerHTML = hora + minAtual + ":" + segAtual;
        tempoTotal.innerHTML = hora + minDuracao + ":" + segDuracao;
        
                    
    }
    
function formatatempo(segs) {
min = 0;
hr = 0;

while(segs>=60) {
if (segs >=60) {
segs = segs-60;
min = min+1;
}
}

while(min>=60) {
if (min >=60) {
min = min-60;
hr = hr+1;
}
}

if (hr < 10) {hr = "0"+hr}
if (min < 10) {min = "0"+min}
if (segs < 10) {segs = "0"+segs}
fin = hr+":"+min+":"+segs
return fin;
}
var segundos = 0; //inicio do cronometro
function conta() {
segundos++;
document.getElementById("infoTempoPausa").innerHTML = formatatempo(segundos);
}

function inicia(){
interval = setInterval("conta();",1000);
}

function para(){
clearInterval(interval);
}

function zera(){
clearInterval(interval);
segundos = 0;
document.getElementById("infoTempoPausa").innerHTML = formatatempo(segundos);
}
function tempopausa() {

document.getElementById("infoTempoPausa").innerHTML=formatatempo(segundos) + "<br>";
}
function limpa() {
document.getElementById("infoTempoPausa").innerHTML = formatatempo(segundos)="";
}