'use strict'

let imports = {}
imports.memory = new WebAssembly.Memory({initial:4})
let memory = new Float32Array(imports.memory.buffer)


let audioCtx
let audioBuffer
let analyser

const scopeBGColor = "rgb(200,200,200)"

function clearScopes() {
    const oscCanvas = document.getElementById("oscilloscope")
    const oscCtx = oscCanvas.getContext("2d");
    const fftCanvas = document.getElementById("fft")
    const fftCtx = fftCanvas.getContext("2d");


    oscCtx.fillStyle = scopeBGColor;
    oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

    fftCtx.fillStyle = scopeBGColor;
    fftCtx.fillRect(0, 0, fftCanvas.width, fftCanvas.height);
}

clearScopes()

let testing = false
function test() {
    if(!testing){
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 1, audioCtx.sampleRate);

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;

        const bufferLength = analyser.frequencyBinCount
        const audioData = new Uint8Array(bufferLength)
        const fftData = new Uint8Array(analyser.fftSize)
        //analyser.getByteTimeDomainData(audioData)
        //analyser.getByteFrequencyData(fftData)

        const oscCanvas = document.getElementById("oscilloscope")
        const oscCtx = oscCanvas.getContext("2d");
        const fftCanvas = document.getElementById("fft")
        const fftCtx = fftCanvas.getContext("2d");

        function draw() {
        
            requestAnimationFrame(draw);
        
            analyser.getByteTimeDomainData(audioData);
        
            oscCtx.fillStyle = scopeBGColor;
            oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);
        
            oscCtx.lineWidth = 2;
            oscCtx.strokeStyle = "rgb(0, 0, 0)";
        
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
            fftCtx.strokeStyle = "rgb(0, 0, 0)";
            
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

        draw();
    }

    WebAssembly.instantiateStreaming(fetch('bin/main.wasm'), {'env': imports}).then( obj => {
        let source = audioCtx.createBufferSource();

        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.connect(analyser);
        source.loop = true
        source.start()

        let playchunk = () => {
            console.log('chunk')
            let t1 = performance.now()

            let ptr = obj.instance.exports.processAudio(audioCtx.sampleRate)/4
            audioBuffer.getChannelData(0).set(memory.subarray(ptr, ptr+audioCtx.sampleRate))

            let t2 = performance.now()
            console.log(t2-t1)
        }
        window.setInterval(playchunk, 1000)
        playchunk()
    })

}

// b/c audio only works after user interacts with page
document.onpointerup = () => {
    // run test once
    if(!testing) {
        test()
        testing = true
    }
}
