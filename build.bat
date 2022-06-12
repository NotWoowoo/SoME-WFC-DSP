clang++ ^
-Wall ^
--target=wasm32 ^
-Ofast ^
--no-standard-libraries ^
-Wl,--export=add ^
-Wl,--no-entry ^
-Wl,--import-memory ^
-o main.wasm ^
main.cpp