clang++ ^
-Wall ^
--target=wasm32 ^
-Ofast ^
--no-standard-libraries ^
-Wl,--export=processAudio ^
-Wl,--no-entry ^
-Wl,--import-memory ^
-o main.wasm ^
main.cpp