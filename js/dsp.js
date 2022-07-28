//NOTE: messages can be used to pass data to the dsp code. AudioWorkletProcessor has port
//'use strict' closeDSP doesn't work with use strict (for now)

//Stop all audio processing
function closeDSP(){
    if(typeof dspAudioContext !== 'undefined'){
        dspAudioContext.then(ac=>ac.close())
    }
}

//restart audio -- js is implementation of processor
function setDSP(js){
    closeDSP()

    dspAudioContext = (async js => {
        const blob = new Blob(
            [js+"\nregisterProcessor('my-processor', MyProcessor);"],
            { type: 'application/javascript' }
        );
        const url = URL.createObjectURL(blob);
        const audioContext = new AudioContext();

        await audioContext.audioWorklet.addModule(url);

        const audioWorkletNode = new AudioWorkletNode(audioContext, 'my-processor');

        audioWorkletNode.connect(audioContext.destination);

        return audioContext
    })(js)
}

//restart audio -- js is the inside of a function that resurns a sample AND has access to variables: time, sampleRate, sample
function setDSPsimple(js){
    setDSP(`
    let time = 0
    let sample = 0
    class MyProcessor extends AudioWorkletProcessor {
        process(_, outputs) {
            for (const output of outputs) {
                for (const channelData of output) {
                    for (let sample_index = 0; sample_index < channelData.length; sample_index += 1) {
                        channelData[sample_index] = (()=>{`+js+`})()
                        time += 1/sampleRate
                        sample+=1
                        if(sample%(sampleRate*2) == sampleRate ) console.log(\``+js+`\n\`, sample, time)
                    }
                }
            }
            return true
        }
    }
    `)
}
