let musicList = [
    {titulo: 'Bossa UH!', artista:'postu', audio:'music/bossa uh.mp3', img:'image/ab67616d0000b2736029febcb938b2b8cb279b47.jpg'},
    {titulo: 'Chove Chuva', artista:'Jorge Ben', audio:'music/Chove_Chuva.mp3', img:'image/50ed5a1fe3f83ef792fba361c8f87ef00e11a312.jpg'},
    {titulo: 'Homem Primata', artista:'Titans', audio:'music/Homem_Primata.mp3', img:'image/500x500.jpg'},
    {titulo: 'SUUS!', artista:'???', audio:"music/NOW'S YOUR CHANCE TO BE THE [[BIG SUS]] (DELTARUNE CHAPTER 2 YTPMV).mp3", img:"image/sus.jpg"},
];

let Music = document.querySelector('audio')
const play = document.querySelector('.botao-play')
const pause = document.querySelector('.botao-pause')

function SegundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60)
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos+':'+campoSegundos;
}
let MusicNow = document.querySelector('.start');
let imagem = document.querySelector('img');
let nameMusic = document.querySelector('.descricao h2')
let nameArtist = document.querySelector('.descricao i')



const next = document.querySelector('.next')
const back = document.querySelector('.back')

page = 0

// botão pause e start

play.addEventListener('click', function() {
    Music.play()
    play.style.display = 'none';
    pause.style.display = 'block'
    console.log(Music.value)
})

pause.addEventListener('click',function() {
    Music.pause();
    pause.style.display = 'none';
    play.style.display = 'block';
})

// barra da musica

Music.addEventListener('timeupdate', () => {
    let BarraTimer = Math.floor((Music.currentTime / Music.duration) * 100) + '%'
    const barra = document.querySelector('progress');
    barra.style.width = BarraTimer
    console.log(BarraTimer)
    MusicNow.textContent = SegundosParaMinutos(Math.floor(Music.currentTime))
})
let timeMusic = document.querySelector('.end');
timeMusic.innerHTML = SegundosParaMinutos(Math.floor(Music.duration))
//setas

function renderMusic(index){
    console.log(index)
    Music.setAttribute('src',musicList[index].audio);
    Music.addEventListener('loadeddata', () => {
        nameMusic.textContent = musicList[index].titulo
        nameArtist.textContent = musicList[index].artista
        imagem.src = musicList[index].img
        timeMusic.innerHTML = SegundosParaMinutos(Math.floor(Music.duration))
    });
    console.log(musicList[index].audio)
    Music.play()
}

next.addEventListener('click',() => {
    if (page >= musicList.length-1)
    {
        page = 0
    }
    else{
        page++;
    }
    play.style.display = 'none';
    pause.style.display = 'block';
    renderMusic(page)
})

back.addEventListener('click', () => {
    if (page <= 0) {page = musicList.length-1}
    else {page--;}
    play.style.display = 'none';
    pause.style.display = 'block';
    renderMusic(page)
})