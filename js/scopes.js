'use strict'

const scopeBGColor = "rgb(100,100,100)"
const scopeLineColor = "rgb(255, 255, 255)"

function clearScopes(oscCanvas, fftCanvas) {
    const oscCtx = oscCanvas.getContext("2d");
    const fftCtx = fftCanvas.getContext("2d");


    oscCtx.fillStyle = scopeBGColor;
    oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

    fftCtx.fillStyle = scopeBGColor;
    fftCtx.fillRect(0, 0, fftCanvas.width, fftCanvas.height);
}

//TODO: Fix this function
function draw(audioCtx, oscCanvas, fftCanvas, oscCtx, fftCtx) {

    let analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount
    const audioData = new Uint8Array(bufferLength)
    const fftData = new Uint8Array(analyser.fftSize)

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(audioData);

    oscCtx.fillStyle = scopeBGColor;
    oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

    oscCtx.lineWidth = 2;
    oscCtx.strokeStyle = scopeLineColor;

    oscCtx.beginPath();

    let sliceWidth = oscCanvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {

        let v = audioData[i] / 128.0;
        let y = v * oscCanvas.height / 2;

        if (i === 0) {
            oscCtx.moveTo(x, y);
        } else {
            oscCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    oscCtx.lineTo(oscCanvas.width, oscCanvas.height / 2);
    oscCtx.stroke();
    
    
    analyser.getByteFrequencyData(fftData)
    fftCtx.fillStyle = scopeBGColor;
    fftCtx.fillRect(0, 0, fftCanvas.width, fftCanvas.height);
    
    fftCtx.lineWidth = 2;
    fftCtx.strokeStyle = scopeLineColor;
    
    fftCtx.beginPath();
    
    for (let i = 0; i < analyser.fftSize; i++) {
        let x = Math.log(999*i/analyser.fftSize+1)/Math.log(1000)*fftCanvas.width
        const v = 1-(fftData[i] / 256.0)+1;
        const y = v * fftCanvas.height / 2;
    
        if (i === 0) {
            fftCtx.moveTo(x, y);
        } else {
            fftCtx.lineTo(x, y);
        }
    }

        fftCtx.lineTo(fftCanvas.width, fftCanvas.height / 2);
        fftCtx.stroke();
}