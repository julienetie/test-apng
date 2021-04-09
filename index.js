// Get the parseAPNG CJS module.  
const parseAPNG = window['apng-js'].default;

const initAnimation = async (parseAPNG) => {
    const statusBox = document.querySelector('#status');
    const canvas = document.querySelector('#animation');
    const ctx = canvas.getContext('2d');

    // Fetch the apng.
    const response = await fetch('./elephant.png');
    const buffer = await response.arrayBuffer();
    const apng = parseAPNG(buffer);

    // Set the canvas dimensions to the apng's.
    canvas.width = apng.width;
    canvas.height = apng.height;

    // Do something on error
    if (apng instanceof Error) {
        console.error('apng.message', apng.message)
        return;
    }

    const context = await apng.getPlayer(ctx);
    const player = await context;

    player.playbackRate = 1;
    const totalFramesIndex = apng.frames.length - 1;

    // Make the animation stop when it gets to the end.
    player.emit = (_, frameIndex, c) => {
        frameIndex === totalFramesIndex && player.stop();
    }

    // Play
    document.getElementById('play-pause-btn').addEventListener('click',
        () => player.paused ? player.play() : player.pause());
    // Stop
    document.getElementById('stop-btn').addEventListener('click',
        () => player.stop());
}

initAnimation(parseAPNG);