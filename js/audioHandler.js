class AudioHandler {

    constructor() {

        this.bg = document.getElementById("bg-music");
        this.jump = document.getElementById("jump-music");
    }

    play(audio) {
        audio.currentTime = 0;
        audio.play();
    }
}