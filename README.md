# SoME-WFC-DSP

SoME project for 2022??

## Development / Local Building

Windows
> Prerequesites:
> Woowoo would know
```
// Install Dependencies
npm install
// Build the webassembly
npm run build_wasm_windows
// Compile Tailwind style once
npm run style
// OR Compile Tailwind style on page edit
npm run autostyle
```

Mac / Linux
> Prerequisites: 
> llvm + clang
```
// Install Dependencies
npm install
// Build the webassembly
npm run build_wasm_unix
// Compile Tailwind style once
npm run style
// OR Compile Tailwind style on page edit
npm run autostyle
```

From there, run index.html using the live server program of your choice (I personally use vscode's live server extension).