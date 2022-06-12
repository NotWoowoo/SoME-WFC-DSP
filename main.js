WebAssembly.instantiateStreaming(fetch('main.wasm')).then( obj => {
    document.body.innerHTML += 'c++ says: 1+2 = ' + obj.instance.exports.add(1,2)
})