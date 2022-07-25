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

var sampleRateDesmosCalcElement = document.getElementById('sampleRateDesmosCalc');
var sampleRateDesmosCalculator = initVisualizer(sampleRateDesmosCalcElement)
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

initVisualizer(document.getElementById('bitDepthDesmosCalc'))
.setExpressions([
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
