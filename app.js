const app =() => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sound
    const sounds = document.querySelectorAll(".sound-picker button");
    //time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //get length of outline
    const outlineLength  = outline.getTotalLength();
    //Duration
    let fackduration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


//pick the sound
sounds.forEach(sound=>{
    sound.addEventListener('click',function(){
        song.src=this.getAttribute('data-sound');
        video.src=this.getAttribute('data-video');
        checkPlaying(song);
    })

})

    //play sound
    play.addEventListener("click",()=>{
        checkPlaying(song);
    })

    


    //select sound duration
    timeSelect.forEach(Option =>{
       Option.addEventListener('click',function(){
           fackduration = this.getAttribute("data-time")
           timeDisplay.textContent = `${Math.floor(fackduration / 60)}:${Math.floor(fackduration %60)}`
       })   
    })

    //function specific to play the sound
    const checkPlaying = (song)=>{
        if(song.paused){
            song.play();
            video.play();
            play.src="./meditation-app-master/svg/pause.svg";
        }
        else{
            song.pause();
            video.pause();
            play.src="./meditation-app-master/svg/play.svg"
        }
    }

    //we can animate the circle
    song.ontimeupdate = ()=>{
        let currentTime = song.currentTime;
        let elapse = fackduration - currentTime;
        let seconds = Math.floor(elapse % 60);
        let minutes = Math.floor(elapse / 60);

        //animate the circle
    let progress = outlineLength - ((currentTime/fackduration)*outlineLength);
    outline.style.strokeDashoffset = progress;

        //animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;
        
        if(currentTime>=fackduration){
            song.pause();
            song.currentTime = 0;
            play.src="./meditation-app-master/svg/play.svg";
            video.pause();
        }
    } 
};

app();