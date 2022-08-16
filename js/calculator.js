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
hideXAxis(squareDesmosCalculator)
calculators.push(squareDesmosCalculator)
squareDesmosCalculator.setExpressions([
    /*
    copied from desmos
    */
    { "id": "1", "type": "expression", "latex": "\\frac{4}{\\pi}\\sum_{k=1}^{b}\\frac{\\sin\\left(2\\pi\\left(2k-1\\right)fx\\right)}{2k-1}+1", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "4", "type": "expression", "latex": "f=0.5", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "3", "type": "expression", "latex": "b=1", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "sliderBounds": { "min": "1", "max": "20", "step": "1" }, "playing": false }, { "id": "2", "type": "expression", "latex": "\\left(0.1b-1,5\\right)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "Harmonics", "showLabel": true, "labelSize": "", "labelOrientation": "above", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "5", "type": "expression", "latex": "(-0.9+1.9t,5)", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "medium", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "6", "type": "expression", "latex": "y=1", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "7", "type": "expression", "latex": "\\left(0,3\\right)", "color": "#c74440", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Time Domain", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "8", "type": "expression", "latex": "", "color": "#388c46", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "9", "type": "expression", "latex": "h\\left(x\\right)=\\frac{3}{\\left(3x\\right)^{2}+1}", "color": "#6042a6", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "10", "type": "expression", "latex": "y=-5", "color": "#000000", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "11", "type": "expression", "latex": "\\sum_{n=1}^{b}\\frac{h\\left(x-2\\left(n-1\\right)-1+10\\right)}{n}-5", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": false, "secret": false, "dragMode": "AUTO", "label": "", "showLabel": false, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }, { "id": "12", "type": "expression", "latex": "\\left(0,-3.5\\right)", "color": "#2d70b3", "lineStyle": "SOLID", "lineWidth": "", "lineOpacity": "", "pointStyle": "POINT", "pointSize": "", "pointOpacity": "", "fillOpacity": "0.4", "hidden": true, "secret": false, "dragMode": "AUTO", "label": "Frequency Domain (approx)", "showLabel": true, "labelSize": "", "labelOrientation": "default", "interactiveLabel": false, "parametricDomain": { "min": "", "max": "" }, "polarDomain": { "min": "", "max": "" }, "domain": { "min": "0", "max": "1" }, "playing": false }
]);

// SAWTOOTH WAVE VISUALIZATION
var sawtoothDesmosCalculator = initVisualizer(document.getElementById('sawtoothDesmosCalc'))
hideXAxis(sawtoothDesmosCalculator)
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

//MOVING AVERAGE VIZUALIZATION
var movingAverageDesmosCalculator = initVisualizer(document.getElementById('MAFDesmosCalc'))
hideXAxis(movingAverageDesmosCalculator)
calculators.push(movingAverageDesmosCalculator)
movingAverageDesmosCalculator.setExpressions(
    /* copied from desmos */
    [{"id":"99","type":"folder","hidden":false,"secret":false},{"id":"67","type":"expression","latex":"M=1","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"1","max":"32","step":"1"},"playing":false},{"id":"100","type":"folder","hidden":false,"secret":false},{"id":"104","type":"expression","latex":"y=1","color":"#000000","lineStyle":"SOLID","lineWidth":"1.3","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"1","type":"expression","latex":"y=-3","color":"#000000","lineStyle":"SOLID","lineWidth":"1.3","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"96","type":"expression","latex":"\\left(0.1M-1.65,\\ 4\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Buffer Length: ${M}","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"98","type":"expression","latex":"\\left(-1.55+3.1t,4\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"0.5","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"85","type":"folder","hidden":false,"secret":false},{"id":"80","type":"expression","latex":"y=1+\\frac{2}{M}\\left\\{-10<x<-10+\\frac{M}{2}\\right\\}","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"83","type":"expression","latex":"x=-10+\\frac{M}{2}\\left\\{1<y<\\frac{2}{M}+1\\right\\}","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"82","type":"expression","latex":"y=1\\left\\{x>-10+\\frac{M}{2}\\right\\}","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"87","type":"expression","latex":"\\left(-10,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"t = 0","showLabel":true,"labelSize":"","labelOrientation":"below_right","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"88","type":"expression","latex":"\\left(-8,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"4","showLabel":true,"labelSize":"medium","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"89","type":"expression","latex":"\\left(-6,1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"8","showLabel":true,"labelSize":"medium","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"90","type":"expression","latex":"\\left(-4,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"12","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"91","type":"expression","latex":"\\left(-2,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"16","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"92","type":"expression","latex":"\\left(0,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"20","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"93","type":"expression","latex":"\\left(2,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"24","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"94","type":"expression","latex":"\\left(4,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"28","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"95","type":"expression","latex":"\\left(6,\\ 1\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"32","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"86","type":"folder","hidden":false,"secret":false},{"id":"65","type":"expression","latex":"h\\left(x\\right)=\\frac{\\sin\\left(\\pi xM\\right)}{M\\sin\\left(\\pi x\\right)}","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"72","type":"expression","latex":"2\\left|h\\left(0.025x+0.25\\right)\\right|-3","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"78","type":"expression","latex":"\\left(-10,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0","showLabel":true,"labelSize":"","labelOrientation":"below_right","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"81","type":"expression","latex":"\\left(0,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0.25 × sampling rate","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"79","type":"expression","latex":"\\left(10,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0.5 × sampling rate","showLabel":true,"labelSize":"","labelOrientation":"below_left","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}]
);

//CONVOLUTION VISUALIZATION
var convolutionDesmosCalculator = initVisualizer(document.getElementById('convolutionDesmosCalc'))
hideXAxis(convolutionDesmosCalculator);
calculators.push(convolutionDesmosCalculator);
convolutionDesmosCalculator.setExpressions(
    /* copied from desmos */
    [{"id":"60","type":"folder","hidden":false,"secret":false},{"id":"8","type":"expression","latex":"p=157","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0","max":"360"},"playing":false},{"id":"24","type":"expression","latex":"p_{1}=\\frac{p\\pi}{180}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"30","type":"expression","latex":"p_{x}=\\left[-4,-3.9,...,-2\\right]","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"6","type":"expression","latex":"\\left(p_{x}-3,0.5\\sin\\left(p_{1}p_{x}+3p_{1}\\right)+2\\right)","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"2","type":"expression","latex":"\\left(\\frac{\\pi^{2}}{1800}p-7,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Frequency","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"5","type":"expression","latex":"(-7+1.95t,3)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"53","type":"expression","latex":"\\left(-6,4\\right)","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"0","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Input x[n]","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"52","type":"folder","hidden":false,"secret":false},{"id":"44","type":"expression","latex":"k_{y}=\\left[k_{y1},k_{y2},k_{y3}\\right]","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"45","type":"expression","latex":"k_{y1}=1","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"-1","max":"1","step":"0.1"},"playing":false},{"id":"46","type":"expression","latex":"k_{y2}=0","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"-1","max":"1","step":"0.1"},"playing":false},{"id":"47","type":"expression","latex":"k_{y3}=0","color":"#6042a6","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"-1","max":"1","step":"0.1"},"playing":false},{"id":"55","type":"expression","latex":"x=-1\\left\\{1.5<y<2.5\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"0.5","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"49","type":"expression","latex":"\\left(-1,0.5k_{y1}+2\\right)","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"${k_y1}","showLabel":true,"labelSize":"medium","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"56","type":"expression","latex":"x=0\\left\\{1.5<y<2.5\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"0.5","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"50","type":"expression","latex":"\\left(0,0.5k_{y2}+2\\right)","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"${k_y2}","showLabel":true,"labelSize":"medium","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"57","type":"expression","latex":"x=1\\left\\{1.5<y<2.5\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"0.5","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"51","type":"expression","latex":"\\left(1,0.5k_{y3}+2\\right)","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"${k_y3}","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"54","type":"expression","latex":"\\left(0,\\ 4\\right)","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"0","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Kernel h[n]","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"42","type":"folder","hidden":false,"secret":false},{"id":"33","type":"expression","latex":"x=-3\\left\\{1.75<y<2.25\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"34","type":"expression","latex":"y=2\\left\\{-3.25<x<-2.75\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"36","type":"expression","latex":"y=2x+8\\left\\{-0.12-3<x<0.12-3\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"39","type":"expression","latex":"y=-2x-4\\left\\{-0.12-3<x<0.12-3\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"40","type":"expression","latex":"y=.5x+3.5\\left\\{-0.23-3<x<0.23-3\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"41","type":"expression","latex":"y=-.5x+0.5\\left\\{-0.23-3<x<0.23-3\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"58","type":"expression","latex":"n=\\left[-10,-9.9,...,10\\right]","color":"#6042a6","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"63","type":"expression","latex":"y=-2","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"59","type":"expression","latex":"\\left(n,\\sin\\left(p_{1}n\\right)k_{y1}+\\sin\\left(p_{1}\\left(n-0.1\\right)\\right)k_{y2}+\\sin\\left(p_{1}\\left(n-0.2\\right)\\right)k_{y3}-2\\right)","color":"#6042a6","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"64","type":"expression","latex":"y=2.2\\left\\{2.25<x<2.75\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"65","type":"expression","latex":"y=2\\left\\{2.25<x<2.75\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"61","type":"expression","latex":"\\left(5,\\ 2.5\\right)","color":"#6042a6","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"0","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Output y[n]","showLabel":true,"labelSize":"1.5","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"66","type":"expression","latex":"x=5\\left\\{1.5<y<2\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"67","type":"expression","latex":"y=-2x+11.5\\left\\{4.9<x<4.99\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"68","type":"expression","latex":"y=2x-8.5\\left\\{5.01<x<5.09\\right\\}","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}]
);

//BRICKWALL RESPONSE VISUALIZATION
var brickwallDesmosCalculator = initVisualizer(document.getElementById('brickwallDesmosCalc'))
calculators.push(brickwallDesmosCalculator)
brickwallDesmosCalculator.setExpressions(
    /* copied from desmos */
    [{"id":"99","type":"folder","hidden":false,"secret":false},{"id":"103","type":"expression","latex":"f=0.5","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0.05","max":"0.5"},"playing":false},{"id":"85","type":"folder","hidden":false,"secret":false},{"id":"106","type":"expression","latex":"h\\left(x\\right)=\\frac{\\sin\\left(2\\pi fx\\right)}{\\pi x}","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"107","type":"expression","latex":"2h\\left(x+10\\right)","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"86","type":"folder","hidden":false,"secret":false},{"id":"72","type":"expression","latex":"y=-1\\left\\{-10<x<-10+40f\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"105","type":"expression","latex":"x=-10+40f\\left\\{-3<y<-1\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"104","type":"expression","latex":"y=-3\\left\\{-10+40f<x\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"78","type":"expression","latex":"\\left(-10,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0","showLabel":true,"labelSize":"","labelOrientation":"below_right","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"81","type":"expression","latex":"\\left(0,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0.25 × sampling rate","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"79","type":"expression","latex":"\\left(10,-3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"f = 0.5 × sampling rate","showLabel":true,"labelSize":"","labelOrientation":"below_left","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"100","type":"folder","hidden":false,"secret":false},{"id":"1","type":"expression","latex":"y=-3","color":"#000000","lineStyle":"SOLID","lineWidth":"1.3","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"96","type":"expression","latex":"\\left(7f-1.9,\\ 3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Cutoff: ${f} × sampling rate","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"98","type":"expression","latex":"\\left(-1.55+3.1t,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"0.5","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"101","type":"expression","latex":"\\left(0,1\\right)","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"Impulse Response","showLabel":true,"labelSize":"2","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"102","type":"expression","latex":"\\left(0,-4\\right)","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"Frequency Response","showLabel":true,"labelSize":"2","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}]
)

//HAMMING WINDOW VISUALIZATION
var hammingDesmosCalculator = initVisualizer(document.getElementById('hammingDesmosCalc'))
calculators.push(hammingDesmosCalculator)
hammingDesmosCalculator.setExpressions(
    /* copied from desmos */
    [{"id":"1","type":"expression","latex":"w\\left(x\\right)=\\left\\{0<x<M:0.54\\ -\\ 0.46\\cos\\left(\\frac{2\\pi x}{M}\\right),0\\right\\}","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"2","type":"expression","latex":"M=1","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"1","max":"10","step":"1"},"playing":false},{"id":"3","type":"expression","latex":"5w\\left(x+10\\right)\\frac{\\sin\\left(2\\pi f\\left(x+10\\right)\\right)}{\\pi\\left(x+10\\right)}","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"4","type":"expression","latex":"f=0.5","color":"#6042a6","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0.05","max":"0.5"},"playing":false},{"id":"5","type":"expression","latex":"\\left(7f-1.9,\\ 3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Cutoff: ${f}","showLabel":true,"labelSize":"","labelOrientation":"below","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"6","type":"expression","latex":"\\left(-1.55+3.1t,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"0.5","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"7","type":"expression","latex":"\\left(0.35M-1.9,\\ 4\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Stopband: ${M}","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"8","type":"expression","latex":"\\left(-1.55+3.1t,4\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"0.5","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"9","type":"expression","latex":"\\left(0,-2\\right)","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"Impulse Response","showLabel":true,"labelSize":"2","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}]
)

// LFO VISUALIZATION
var lfoDesmosCalculator = initVisualizer(document.getElementById('LFODesmosCalc'))
calculators.push(lfoDesmosCalculator)
lfoDesmosCalculator.setExpressions([
    /*copied from desmos*/
    {"id":"8","type":"expression","latex":"p=180","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0","max":"360"},"playing":false},{"id":"24","type":"expression","latex":"p_{1}=\\frac{p\\pi}{360}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"13","type":"expression","latex":"q=0","color":"#388c46","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":true,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"sliderBounds":{"min":"0","max":"360"},"playing":false},{"id":"23","type":"expression","latex":"q_{1}=\\frac{q+90}{360}10\\pi","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"6","type":"expression","latex":"\\left\\{-4<x<-2:0.5\\sin\\left(p_{1}x+3p_{1}\\right)+2\\right\\}","color":"#c74440","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"29","type":"expression","latex":"\\sin\\left(p_{1}x\\right)","color":"#c74440","lineStyle":"DASHED","lineWidth":"1","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"15","type":"expression","latex":"\\left\\{2<x<4:0.5\\sin\\left(q_{1}x-3q_{1}\\right)+2\\right\\}","color":"#2d70b3","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"12","type":"expression","latex":"\\left(\\sin\\left(\\frac{p\\pi}{360}x\\right)\\sin\\left(\\frac{q+90}{360}10\\pi x\\right)\\right)","color":"#6042a6","lineStyle":"SOLID","lineWidth":"4","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"2","type":"expression","latex":"\\left(\\frac{\\pi^{2}}{1800}p-4,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"LFO Frequency","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"5","type":"expression","latex":"(-4+1.95t,3)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"16","type":"expression","latex":"\\left(\\frac{\\pi^{2}}{1800}q+2,3\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"Tone Frequency","showLabel":true,"labelSize":"","labelOrientation":"above","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"17","type":"expression","latex":"(2+1.95t,3)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"","pointOpacity":"","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false},{"id":"21","type":"expression","latex":"\\left(0,2\\right)","color":"#000000","lineStyle":"SOLID","lineWidth":"","lineOpacity":"","pointStyle":"POINT","pointSize":"20","pointOpacity":"1","fillOpacity":"0.4","hidden":false,"secret":false,"dragMode":"AUTO","label":"","showLabel":false,"labelSize":"medium","labelOrientation":"default","interactiveLabel":false,"parametricDomain":{"min":"","max":""},"polarDomain":{"min":"","max":""},"domain":{"min":"0","max":"1"},"playing":false}
]);

