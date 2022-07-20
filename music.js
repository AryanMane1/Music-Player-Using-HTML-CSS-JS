var music = document.getElementsByTagName("audio")[0]
var main_button = document.getElementById('main_play')
var next = document.getElementById('next')
var pre = document.getElementById('prev')
var Title = document.getElementById('title')
var image = document.getElementById('music_image')
var time_stamp = document.getElementById('time_stamp')
var music_length = document.getElementById('music_lenght')
var myprogressbar = document.getElementById('myProgressbar')
var song_list = document.getElementById('song-list')
var repeat = document.getElementById('repeat')
var random = document.getElementById('random')
var is_random_song=false;
var is_repeat_song=false;
var is_music_started = false;

var is_playing = true;
var current_music_num = 0;
var pause_progress = false;

var Music_data = [  
    {file:"Fearless cop.mp3",image:"Fearless cop.jpg",title:"Fearless cop"},
    {file:"Pirate.mp3",image:"Pirate.jpg",title:"Pirate"},
    {file:"Unstoppable - Sia.mp3",image:"Unstoppable - Sia.jpg",title:"Unstoppable - Sia"},
    {file:"Fight Back.mp3",image:"Fight Back.jpg",title:"Fight Back"},
    {file:"Believer.mp3",image:"believer.jpg",title:"Believer"},
    {file:"Hall Of Fame.mp3",image:"Hall Of Fame.jpg",title:"Hall Of Fame"},
    {file:"Let Me Love You .mp3",image:"let me love you.jpg",title:"Let Me Love You"},
    {file:"baby.mp3",image:"baby.jpg",title:"Baby - Justin Bieber"},
    {file:"Never Say Never .mp3",image:"Never Say Never.jpg",title:"Never Say Never"},
    {file:"Remember The Name.mp3",image:"Remember The Name.jpg",title:"Remember The Name"},
    {file:"sorry.mp3",image:"sorry.jpg",title:"Sorry - Justin Bieber"},
    {file:"Wavin Flags.mp3",image:"Wavin Flag.jpg",title:"Wavin Flags"},
    {file:"Till I Collapse.mp3",image:"Till I Collapse.jpg",title:"Till I Collapse"},
]

function fill_numbers(num){
    if(num.length==1){
        return "0"+num
    }else{
        return num
    }
}   
function play_music(){
    music.play();
    main_button.classList.replace('fa-play-circle','fa-pause-circle');
    is_playing = true;  
}
function set_music(obj,num){
    try {
        let eles = document.getElementsByClassName("select");
        for (var i = 0; i < eles.length; i++) {
            eles[i].classList.remove('select');
        }
        let waves = document.getElementsByClassName("loader-container")
        for (var i = 0; i < waves.length; i++) {
            waves[i].innerHTML = '';
            }
        } catch{
    }
        document.getElementById(obj.title).classList.add("select")
        Title.textContent = obj.title;
        music.src = "music/"+obj.file;
        current_music_num = num;
        image.classList.add("hidden")
        setTimeout(() => {
            result = image.classList.remove("hidden")
            image.src = "Images/"+obj.image;
            pause_progress = false
        }, 100);
        is_music_started = true;
        play_music()
        document.getElementById("waves-"+obj.title).innerHTML = `
        <div class="rectangle-1"></div>
        <div class="rectangle-2"></div>
        <div class="rectangle-3"></div>
        <div class="rectangle-4"></div>
        <div class="rectangle-5"></div>
        <div class="rectangle-6"></div>
        <div class="rectangle-5"></div>
        <div class="rectangle-4"></div>
        <div class="rectangle-3"></div>
        <div class="rectangle-2"></div>
        <div class="rectangle-1"></div> 
        </div>`
    }   
function pause_music(){
    music.pause();
    main_button.classList.replace('fa-pause-circle','fa-play-circle');
    is_playing = false;
}
function select_song(title){
    pause_progress = true;
    myprogressbar.value = 0
    obj = {};
    i = 0
    Music_data.forEach(ele => {
        if(ele.title == title){
            obj = ele;
            console.log(ele,i);
            set_music(obj,i);
            return 0;
        }
        i+=1
    });
}

// initialize
html = ''
Music_data.forEach(ele => {
    html+=`  <div id="${ele.title}" style="cursor: pointer;" onclick="select_song('${ele.title}')" class="songItem">
    <a><img src="Images/${ele.image}" alt=""></a>
    <span class="songlist-title">${ele.title}<div class="loader-container" id="waves-${ele.title}">
    </div></span>
    <span class="songlistplay"></span>
    </div>`
})

song_list.innerHTML = html


// Listioning events
myprogressbar.addEventListener("input",()=>{
    music.currentTime = myprogressbar.value*music.duration/1000;
    console.log("Update");
})

music.addEventListener('timeupdate',(env)=>{
    seconds = music.currentTime;
    time_stamp.innerText = `${fill_numbers(String(Math.floor(seconds/60)))}:${fill_numbers(String(Math.floor(seconds%60)))}`
    seconds =  music.duration;
    console.log(seconds);
    if(!isNaN(seconds)){
        seconds = Math.floor(seconds)
        music_length.innerText = `${fill_numbers(String(Math.floor(seconds/60)))}:${fill_numbers(String(Math.floor(seconds%60)))}`
    }else{
        music_length.innerText = `00:00`   
    }
    pregress = parseInt((music.currentTime/music.duration)*1000)
    pause_progress ? myprogressbar.value =0:myprogressbar.value = pregress;
})

music.addEventListener("ended", function(){
    pause_progress = true;
    myprogressbar.value = 0
    if(is_repeat_song){
        music.currentTime = 0;
        set_music(Music_data[current_music_num],current_music_num)
    }
    else if(is_random_song){
        rand_num = Math.floor(Math.random() * (Music_data.length+1));
        set_music(Music_data[rand_num],rand_num);
    }else{
        if(current_music_num!=Music_data.length-1){
            set_music(Music_data[current_music_num+1],current_music_num+1);
        }else{
            set_music(Music_data[0],0);
        }
    }
});

main_button.addEventListener('click',()=>{
   is_playing ? pause_music():play_music();
})  

next.addEventListener('click',()=>{
    pause_progress = true;
    myprogressbar.value = 0
    if(is_repeat_song){
        music.currentTime = 0;
    }
    else if(is_random_song){
        rand_num = Math.floor(Math.random() * (Music_data.length+1));
        set_music(Music_data[rand_num],rand_num);
    }else{
        if(current_music_num!=Music_data.length-1){
            set_music(Music_data[current_music_num+1],current_music_num+1);
        }else{
            set_music(Music_data[0],0);
        }
    }
})

pre.addEventListener('click',()=>{
    pause_progress = true;
    myprogressbar.value = 0
    if(is_repeat_song){
        music.currentTime = 0;
    }
    else if(is_random_song){
        rand_num = Math.floor(Math.random() * (Music_data.length+1));
        set_music(Music_data[rand_num],rand_num);
    }
    else{
        if(current_music_num!=0){
            set_music(Music_data[current_music_num-1],current_music_num-1)
        }else{
            set_music(Music_data[Music_data.length-1],Music_data.length-1);
        }
    }
})

window.addEventListener("keyup", (event) => {
    if (event.key === "Shift" || event.key === "s" || event.key === "k") {
        if(is_music_started){
            is_playing ? pause_music():play_music();
        }else{
            set_music(Music_data[current_music_num],current_music_num);
        }
    }
    if (event.key === "ArrowLeft") {
        music.currentTime = music.currentTime-5
    }
    if (event.key === "ArrowRight") {
        music.currentTime = music.currentTime+5
    }
})

repeat.addEventListener("click",()=>{
    if(is_repeat_song){
        is_repeat_song = false;
        repeat.classList.remove("clicked")
    }else{
        is_repeat_song = true;
        repeat.classList.add("clicked")
        
    }
})
random.addEventListener("click",()=>{
    if(is_random_song){
        is_random_song = false;
        random.classList.remove("clicked")
    }else{
        is_random_song = true;
        random.classList.add("clicked")

    }
})

document.getElementById(Music_data[0].title).click();
main_button.click();