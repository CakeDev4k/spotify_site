let musicList = [
    {id: 1, titulo: 'Bossa UH!', artista:'postu', audio:'music/bossa uh.mp3', img:'image/ab67616d0000b2736029febcb938b2b8cb279b47.jpg'},
    {id: 2, titulo: 'Chove Chuva', artista:'Jorge Ben', audio:'music/Chove_Chuva.mp3', img:'image/50ed5a1fe3f83ef792fba361c8f87ef00e11a312.jpg'},
    {id: 3, titulo: 'Homem Primata', artista:'Titans', audio:'music/Homem_Primata.mp3', img:'image/500x500.jpg'},
    {id: 4, titulo: 'SUUS!', artista:'???', audio:"music/NOW'S YOUR CHANCE TO BE THE [[BIG SUS]] (DELTARUNE CHAPTER 2 YTPMV).mp3", img:"image/sus.jpg"},
];

let idMusic = 4
let page = 0
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

// adicionar musicas

const hidden_page = document.getElementById('hidden_page')
const addMusic_button_open = document.getElementById('addMusic_button_open')
const addMusic_button_close = document.getElementById('addMusic_button_close')
const data_anime = document.querySelectorAll(".page-addMusic h1")
const page_addMusic = document.querySelector("#page-addMusic")

addMusic_button_open.addEventListener('click', function() {
    addMusic_button_open.style.display = 'none'
    addMusic_button_close.style.display = 'block'
    hidden_page.style.display = 'block'
})

addMusic_button_close.addEventListener('click', function() {
    addMusic_button_open.style.display = 'block'
    addMusic_button_close.style.display = 'none'
    hidden_page.style.display = 'none'
})

// botão pause e start

play.addEventListener('click', function() {
    Music.play()
    play.style.display = 'none';
    pause.style.display = 'block'
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
    MusicNow.textContent = SegundosParaMinutos(Math.floor(Music.currentTime))
    if (BarraTimer === '100%'){
        if (page >= musicList.length-1)
        {
            page = 0
        }
        else{
            page++;
        }
        renderMusic(page)
        Music.play()
    }
})
let timeMusic = document.querySelector('.end');
timeMusic.innerHTML = SegundosParaMinutos(Math.floor(Music.duration))
//setas

const delete_Music = document.querySelector('#delete_Music')
delete_Music.setAttribute('onclick', `deletar(${musicList[page].id})`)

function renderMusic(index){
    if (musicList.length > 0){
    Music.setAttribute('src',musicList[index].audio);
    Music.addEventListener('loadeddata', () => {
        nameMusic.textContent = musicList[index].titulo
        nameArtist.textContent = musicList[index].artista
        imagem.src = musicList[index].img
        timeMusic.innerHTML = SegundosParaMinutos(Math.floor(Music.duration))
        delete_Music.setAttribute('onclick', `deletar(${musicList[page].id})`)
        Music.play()
    });
    }
    else{
        musicList = [{id: 1, titulo: 'Voce deletou tudo', artista:'Dev', audio:'music/Persona.mp3', img:'image/EvEOUkzXAAwNE3d.jpg'}]
        Music.setAttribute('src',musicList[index].audio);
        Music.addEventListener('loadeddata', () => {
            nameMusic.textContent = musicList[index].titulo
            nameArtist.textContent = musicList[index].artista
            imagem.src = musicList[index].img
            timeMusic.innerHTML = SegundosParaMinutos(Math.floor(Music.duration))
            delete_Music.setAttribute('onclick', `deletar(${musicList[page].id})`)
            Music.play()
        });
    }
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

const setName = document.getElementById('File_setName')
const File_music = document.getElementById('File_music')
const File_musicImg = document.getElementById('File_musicImg')
const setArtist = document.getElementById('File_setArtist')
const add_music = document.getElementById('add_music')
let File_music_result = ''
let File_musicImg_result = ''


File_music.addEventListener('change', (event) => {
    const reader = new FileReader()

    reader.onload = () => {
        File_music_result = reader.result
        console.log(File_music_result)
    }

    reader.readAsDataURL(File_music.files[0])
})


File_musicImg.addEventListener('change', (event) => {
    const reader = new FileReader()

    reader.onload = () => {
        File_musicImg_result = reader.result
        console.log(File_musicImg_result)
    }

    reader.readAsDataURL(File_musicImg.files[0])
})

add_music.addEventListener('click', () => {
    
    if (setName.value === ''){
        return alert('por favor coloque o nome da musica')
    }
    if (setArtist.value === ''){
        return alert('por favor coloque o nome do(a) artista')
    }
    if (File_music_result === ''){
        return alert('coloque a musica por favor')
    }
    if (File_musicImg_result === ''){
        return alert('coloque a foto da musica por favor')
    }
    idMusic++
    musicList.push({
        id: idMusic,
        titulo: setName.value,
        artista: setArtist.value,
        audio: File_music_result,
        img: File_musicImg_result
    })

    addMusic_button_close.click()
    console.log(musicList)  
})


function deletar(id){
    for(let i = 0; i < musicList.length; i++) {
        if (musicList[i].id === id){
            musicList.splice(i,1)
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
        }
    }
}
