'use strict'

// Wrapper Func for Desmos.GraphingCalculator()
function initVisualizer(e) {
    var c = Desmos.GraphingCalculator(e,
        {
            expressions: false,
            settingsMenu: false,
            zoomButtons: false,
            lockViewport: true
        });
    var s = c.getState();
    s.graph.showGrid = false;
    s.graph.showYAxis = false;
    s.graph.xAxisNumbers = false;
    c.setState(s)
    return c
}

function hideXAxis(c) {
    var s = c.getState();
    s.graph.showXAxis = false;
    c.setState(s)
}

function setCalculatorColorInversion(calculators, invert) {
    Array.from(calculators).forEach(c => {
        c.updateSettings({
            invertedColors: invert
        })
    })
}

// For dark mode to work properly, every calculator needs to be pushed to this list
let calculators = []

// SAMPLE RATE VISUALIZATION
var sampleRateDesmosCalculator = initVisualizer(document.getElementById('sampleRateDesmosCalc'))
calculators.push(sampleRateDesmosCalculator)
sampleRateDesmosCalculator.setExpressions([
    {
        id: 'list',
        latex: 'n=[-10,-10+s^{-1}...10]'
    },
    {
        id: 'ampval',
        latex: 'a=1',
        sliderBounds: { min: 0.1, max: 2, step: 0.1 }
    },
    {
        id: 'ampslider',
        latex: '(-6+a,5)',
        color: Desmos.Colors.BLACK,
        label: "Amplitude",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'ampsliderbar',
        latex: '(-5.9+1.9t,5)',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'rateval',
        latex: 's=1',
        sliderBounds: { min: 1, max: 5, step: 0.1 }
    },
    {
        id: 'rateslider',
        latex: '(2+s,5)',
        color: Desmos.Colors.BLACK,
        label: "Sample Rate",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'ratesliderbar',
        latex: '(3+4t,5)',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'sine',
        latex: '(n, a \\sin(n))',
        color: Desmos.Colors.BLUE
    }
]);

// BIT DEPTH VISUALIZATION
var bitDepthDesmosCalculator = initVisualizer(document.getElementById('bitDepthDesmosCalc'))
calculators.push(bitDepthDesmosCalculator)
bitDepthDesmosCalculator.setExpressions([
    {
        id: 'depthval',
        latex: 'b=8',
        sliderBounds: { min: 1, max: 16, step: 1 }
    },
    {
        id: 'depthslider',
        latex: '(-6+b/2,5)',
        color: Desmos.Colors.BLACK,
        label: "Bit Depth: ${b}",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'depthSliderbar',
        latex: '(-5.5+7.5t,5)',
        color: Desmos.Colors.BLACK
    },
    // keeps amplitude same and DC = 0 for any bit depth
    {
        id: 'm',
        latex: 'm=2^b / (2^b -1)'
    },
    {
        id: 'a',
        latex: 'a=0.5 \\abs(4m \\floor((2^{b-1}) \\sin(5/3))/((2^{b-1})) + 4m \\floor( (2^{b-1}) \\sin(-5/3) )/((2^{b-1})))'
    },
    //doing sine with list instead of regular function to fill vertical gaps
    {
        id: 'list',
        latex: 'l=[-10,-10+0.02...10]'
    },
    {
        id: 'sine',
        latex: '(l, a+ 4m \\floor((2^{b-1}) \\sin(l/3))/((2^{b-1})))',
        color: Desmos.Colors.BLUE,
        lines: true,
        points: false
    }
]);

// FREQUENCY VISUALIZATION
var frequencyDesmosCalculator = initVisualizer(document.getElementById('frequencyDesmosCalc'))
calculators.push(frequencyDesmosCalculator)
frequencyDesmosCalculator.setExpressions([
    {
        id: 'freqval',
        latex: 'w=0.5',
        sliderBounds: { min: 0.5, max: 10, step: 0.1 }
    },
    {
        id: 'freqslider',
        latex: '(-5.25+w,5)',
        color: Desmos.Colors.BLACK,
        label: "Frequency: ${w}hz",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'freqsliderbar',
        latex: '(-4.75+9.6t,5)',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'sine',
        latex: '\\sin(wx)',
        color: Desmos.Colors.BLUE
    }
]);

// PHASE VISUALIZATION
var phaseDesmosCalculator = initVisualizer(document.getElementById('phaseDesmosCalc'))
calculators.push(phaseDesmosCalculator)
phaseDesmosCalculator.setExpressions([
    {
        id: 'wave1',
        latex: '\\left\\{-4<x<-2:0.5\\sin\\left(\\pi\\left(x+\\frac{p}{180}\\right)\\right)+3\\right\\}',
        color: Desmos.Colors.RED,
    },
    {
        id: 'phase1val',
        latex: 'p=0',
        sliderBounds: { min: 0, max: 360 }
    },
    {
        id: 'phase1slider',
        latex: '((\\pi^2/1800)p-4,5)',
        color: Desmos.Colors.BLACK,
        label: "Phase: ${p} deg",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'phase1sliderbar',
        latex: '(-4+1.95t,5)',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'wave2',
        latex: '\\left\\{2<x<4:0.5\\sin\\left(\\pi\\left(x+\\frac{q}{180}\\right)\\right)+3\\right\\}',
        color: Desmos.Colors.BLUE,
    },
    {
        id: 'phase2val',
        latex: 'q=0',
        sliderBounds: { min: 0, max: 360 }
    },
    {
        id: 'phase2slider',
        latex: '((\\pi^2/1800)q+2,5)',
        color: Desmos.Colors.BLACK,
        label: "Phase: ${q} deg",
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE
    },
    {
        id: 'phase2sliderbar',
        latex: '(2+1.95t,5)',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'wavesum',
        latex: '0.5\\left(\\sin\\left(\\pi\\left(x+\\frac{p}{180}\\right)\\right)+\\sin\\left(\\pi\\left(x+\\frac{q}{180}\\right)\\right)\\right)',
        color: Desmos.Colors.PURPLE
    },
    {
        id: 'plusVerticalLine',
        latex: 'x=0\\left\\{2.75<y<3.25\\right\\}',
        color: Desmos.Colors.BLACK
    },
    {
        id: 'plusHorizontalLine',
        latex: 'y=3\\left\\{-0.25<x<0.25\\right\\}',
        color: Desmos.Colors.BLACK
    },
]);

// SQUARE WAVE VISUALIZATION
var squareDesmosCalculator = initVisualizer(document.getElementById('squareDesmosCalc'))
calculators.push(squareDesmosCalculator)
squareDesmosCalculator.setExpressions([
    /*
    copied from desmos
    */
    { "id": "1", "type": "expression", "latex": "\\frac{4}{\\pi}\\sum_{k=1}^{b}\\frac{\\sin\\left(2\\pi\\left(2k-1\\right)fx\\right)}{2k-1}+1", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "4", "type": "expression", "latex": "f=0.5", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "3", "type": "expression", "latex": "b=1", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "sliderBounds": { "min": "1", "max": "20", "step": "1" }, "playing": false }, { "id": "2", "type": "expression", "latex": "\\left(0.1b-1,5\\right)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "Harmonics", "showLabel": true, "labelSize": "", "labelOrientation": "above", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "5", "type": "expression", "latex": "(-0.9+1.9t,5)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "medium", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "6", "type": "expression", "latex": "y=1", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "7", "type": "expression", "latex": "\\left(0,3\\right)", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Time Domain", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "8", "type": "expression", "latex": "", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "9", "type": "expression", "latex": "h\\left(x\\right)=\\frac{3}{\\left(3x\\right)^{2}+1}", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "10", "type": "expression", "latex": "y=-5", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "11", "type": "expression", "latex": "\\sum_{n=1}^{b}\\frac{h\\left(x-2\\left(n-1\\right)-1+10\\right)}{n}-5", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "12", "type": "expression", "latex": "\\left(0,-3.5\\right)", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Frequency Domain (approx)", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }
]);

// SAWTOOTH WAVE VISUALIZATION
var sawtoothDesmosCalculator = initVisualizer(document.getElementById('sawtoothDesmosCalc'))
calculators.push(sawtoothDesmosCalculator)
sawtoothDesmosCalculator.setExpressions([
    /*
    copied from desmos
    */
    { "id": "1", "type": "expression", "latex": "\\frac{4}{\\pi}\\sum_{k=1}^{b}\\frac{\\sin\\left(2\\pi kfx\\right)}{k}+1", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "4", "type": "expression", "latex": "f=0.5", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "3", "type": "expression", "latex": "b=1", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "sliderBounds": { "min": "1", "max": "20", "step": "1" }, "playing": false }, { "id": "2", "type": "expression", "latex": "\\left(0.1b-1,5\\right)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "Harmonics", "showLabel": true, "labelSize": "", "labelOrientation": "above", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "5", "type": "expression", "latex": "(-0.9+1.9t,5)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "medium", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "6", "type": "expression", "latex": "y=1", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "7", "type": "expression", "latex": "\\left(0,3.5\\right)", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Time Domain", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "8", "type": "expression", "latex": "", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "9", "type": "expression", "latex": "h\\left(x\\right)=\\frac{3}{\\left(4x\\right)^{2}+1}", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "10", "type": "expression", "latex": "y=-5", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "11", "type": "expression", "latex": "\\sum_{n=1}^{b}\\frac{h\\left(x-n+10\\right)}{n}-5", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "12", "type": "expression", "latex": "\\left(0,-3.5\\right)", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Frequency Domain (approx)", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }
]);

//NYQUIST VISUALIZATION
var nyquistDesmosCalculator = initVisualizer(document.getElementById('nyquistDesmosCalc'))
hideXAxis(nyquistDesmosCalculator)
calculators.push(nyquistDesmosCalculator)
nyquistDesmosCalculator.setExpressions([
    {
        id: 'samplerateval',
        latex: 's=8',
        sliderBounds: { min: 0, max: 40, step: 1 }
    },
    {
        id: 'freqval',
        latex: 'f=4',
        sliderBounds: { min: 0, max: 40, step: 0.1 }
    },
    {
        id: 'samplelist',
        latex: 'n=[-10,-10+\\frac{1}{s},...,10]',
    },
    {
        id: 'aliasfreq',
        latex: 'f_{a}=\\operatorname{abs}\\left(\\left(s\\operatorname{round}\\left(\\frac{f}{s}\\right)\\right)-f\\right)',
    },
    {
        id: 'realwavelabel',
        color: Desmos.Colors.BLUE,
        latex: "(0,5.25)",
        showLabel: true,
        pointSize: 0,
        labelOrientation: Desmos.LabelOrientations.ABOVE,
        label: "Real Wave"
    },
    {
        id: 'sampledwavelabel',
        color: Desmos.Colors.PURPLE,
        latex: "(-5,-4)",
        showLabel: true,
        pointSize: 0,
        labelOrientation: Desmos.LabelOrientations.ABOVE,
        label: "Sampled Wave"
    },
    {
        id: 'aliaswavelabel',
        color: Desmos.Colors.RED,
        latex: "(4,-4)",
        showLabel: true,
        pointSize: 0,
        labelOrientation: Desmos.LabelOrientations.ABOVE,
        label: "Aliased Wave (${f_a}hz)"
    },
    {
        id: 'realwavegraph',
        color: Desmos.Colors.BLUE,
        latex: "\\sin(\\pi fx)+4",
    },
    {
        id: 'sampledwavegraph',
        color: Desmos.Colors.PURPLE,
        latex: "(n, \\sin(\\pi fn)-2)",
        lines: true,
        lineOpacity: 0.2
    },
    {
        id: 'aliaswavegraph',
        color: Desmos.Colors.RED,
        latex: '\\sin(\\pi f_a x)-2'
    },
    {
        id: 'sampleratesliderbar',
        color: Desmos.Colors.BLACK,
        latex: '(4t-5,1.5)',
    },
    {
        id: 'samplerateslider',
        color: Desmos.Colors.BLACK,
        latex: '(0.1s-5,1.5)',
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.ABOVE,
        label: "Sample Rate: ${s}hz",
    },
    {
        id: 'freqsliderbar',
        color: Desmos.Colors.BLACK,
        latex: '(8t-5,0.5)',
    },
    {
        id: 'freqslider',
        color: Desmos.Colors.BLACK,
        latex: '(0.2f-5,0.5)',
        showLabel: true,
        labelOrientation: Desmos.LabelOrientations.BELOW,
        label: "Frequency: ${f}hz",
    }
]);

// LFO VISUALIZATION
var lfoDesmosCalculator = initVisualizer(document.getElementById('LFODesmosCalc'))
calculators.push(lfoDesmosCalculator)
lfoDesmosCalculator.setExpressions([
    /*copied from desmos*/
    {"id":"8","type":"expression","latex":"p=180","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0","max":"360"},"playing":false},{"id":"24","type":"expression","latex":"p_{1}=\\frac{p\\pi}{360}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"13","type":"expression","latex":"q=0","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0","max":"360"},"playing":false},{"id":"23","type":"expression","latex":"q_{1}=\\frac{q+90}{360}10\\pi","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"6","type":"expression","latex":"\\left\\{-4<x<-2:0.5\\sin\\left(p_{1}x+3p_{1}\\right)+2\\right\\}","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"29","type":"expression","latex":"\\sin\\left(p_{1}x\\right)","color":"#c74440","lineStyle":"DASHED","lineWidth":"1","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"15","type":"expression","latex":"\\left\\{2<x<4:0.5\\sin\\left(q_{1}x-3q_{1}\\right)+2\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"12","type":"expression","latex":"\\left(\\sin\\left(\\frac{p\\pi}{360}x\\right)\\sin\\left(\\frac{q+90}{360}10\\pi x\\right)\\right)","color":"#6042a6","lineStyle":"SOLID","lineWidth":"4","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"2","type":"expression","latex":"\\left(\\frac{\\pi^{2}}{1800}p-4,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"LFO Frequency","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"5","type":"expression","latex":"(-4+1.95t,3)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"16","type":"expression","latex":"\\left(\\frac{\\pi^{2}}{1800}q+2,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Tone Frequency","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"17","type":"expression","latex":"(2+1.95t,3)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"21","type":"expression","latex":"\\left(0,2\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"20","pointOpacity":"1","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}
]);
