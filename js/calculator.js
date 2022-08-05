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
{
    id: 'harmval',
    latex: 'k=1',
    sliderBounds: { min: 1, max: 20, step: 1 }
},
{
    id: 'harmslider',
    latex: '(0.1k-1,3)',
    color: Desmos.Colors.BLACK,
    label: "Harmonics: ${k}",
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE
},
{
    id: 'harmsliderbar',
    latex: '(-0.9+1.9t,3)',
    color: Desmos.Colors.BLACK
},
{
    id: 'wave',
    latex: '(4/\\pi)\\sum_{n=1}^{k}\\frac{\\sin(\\pi(2n-1)x)}{2n-1}',
    color: Desmos.Colors.BLUE
}
]);

// SAWTOOTH WAVE VISUALIZATION
var sawtoothDesmosCalculator = initVisualizer(document.getElementById('sawtoothDesmosCalc'))
calculators.push(sawtoothDesmosCalculator)
sawtoothDesmosCalculator.setExpressions([
{
    id: 'harmval',
    latex: 'k=1',
    sliderBounds: { min: 1, max: 20, step: 1 }
},
{
    id: 'harmslider',
    latex: '(0.1k-1,3)',
    color: Desmos.Colors.BLACK,
    label: "Harmonics: ${k}",
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE
},
{
    id: 'harmsliderbar',
    latex: '(-0.9+1.9t,3)',
    color: Desmos.Colors.BLACK
},
{
    id: 'wave',
    latex: "\\sum_{n=1}^{k}(1/n)\\sin(n\\pi x)",
    color: Desmos.Colors.BLUE
}
]);