//NOTE: messages can be used to pass data to the dsp code. AudioWorkletProcessor has 'port' variable for this
'use strict'

var dspAudioContext //starts undefined
var dspAudioContextAnalyzer //starts undefined
var dspSetVolume = ()=>{}

//Stop all audio processing
function closeDSP(){
    //might not even be worth checking, b/c calling a function on something undefined doesn't seem to break anything
    if(typeof dspAudioContext !== 'undefined'){
        dspAudioContext.then(ac=>ac.close())
    }
    dspAudioContextAnalyzer = undefined //kind of a janky way to stop drawing. Can change later?
    dspAudioContext = undefined //janky way to prevent calling close on already closed context
}

//restart audio -- js has to be implementation of processor class
function setDSP(js){
    closeDSP()

    dspAudioContext = (async js => {
        const blob = new Blob(
            [js+"\nregisterProcessor('my-processor', MyProcessor);"],
            { type: 'application/javascript' }
        );
        const url = URL.createObjectURL(blob);
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        await audioContext.audioWorklet.addModule(url);
        const audioWorkletNode = new AudioWorkletNode(audioContext, 'my-processor');

        dspAudioContextAnalyzer = audioContext.createAnalyser()
        audioWorkletNode.connect(dspAudioContextAnalyzer)

        let gainNode = audioContext.createGain()
        audioWorkletNode.connect(gainNode)
        gainNode.connect(audioContext.destination)

        dspSetVolume = v => gainNode.gain.value = v
        dspSetVolume(document.getElementById('vol-slider').value/100)

        document.getElementById('editor-err').innerHTML = ''
        audioWorkletNode.port.onmessage = e => document.getElementById('editor-err').innerHTML = '<b>ERROR: </b>' + e.data

        return audioContext
    })(js)
}

//restart audio -- js is the inside of a function that returns a sample AND has access to the follownig variables: time, sampleRate, sample
function setDSPsimple(js){
    setDSP(`
    let time = 0
    let sampleNumber = 0
    let sin = Math.sin
    let cos = Math.cos
    let tan = Math.tan
    let pow = Math.pow
    let PI = Math.PI
    let _stillGood = true
    let global = {}
    let globalSet = (v, n) => {if(!(v in global)) global[v] = n}
    let lerp = (a,b,t) => a + t*(b-a)
    let min = Math.min
    let max = Math.max
    let clamp = (v, lo, hi) => min(hi, max(lo, v))
    let rand = () => 2*Math.random()-1
    let round = Math.round
    let floor = Math.floor
    let ceil = Math.ceil
    let abs = Math.abs
    class MyProcessor extends AudioWorkletProcessor {
        process(_, outputs) {
            if(!_stillGood) return false
            try{
                for (const output of outputs) {
                    for (const channelData of output) {
                        for (let sample_index = 0; sample_index < channelData.length; sample_index += 1) {
                            channelData[sample_index] = (()=>{`+js+`})()
                            time += 1/sampleRate
                            sampleNumber+=1
                        }
                    }
                }
            }catch(err){
                _stillGood = false
                let linenum = err.stack.split(":")
                linenum = linenum[linenum.length-2]-27
                this.port.postMessage('on line ' + linenum + ' : ' + err.message)
            }
            return true
        }
    }
    `)
}
