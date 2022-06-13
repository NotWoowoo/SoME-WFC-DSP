extern "C" double __builtin_floor(double);
inline float mod(float x, float y) { return x - y*__builtin_floor(x/y);}

constexpr float PI = 3.141592653589;

inline float sin(float x)
{
    float cv = 0.0;

    x = mod(x, PI*2.0);

    if( x < -3.14159265 )
        x += 6.28318531;
    else if( x > 3.14159265 )
        x -= 6.28318531;

    if( x < 0 )
    {
        cv = 1.27323954 * x + 0.405284735 * x * x;

        if( cv < 0 )
            cv = .225 * ( cv * -cv - cv ) + cv;
        else
            cv = .225 * ( cv * cv - cv ) + cv;
    }
    else
    {
        cv = 1.27323954 * x - 0.405284735 * x * x;

        if( cv < 0 )
            cv = .225 * ( cv * -cv - cv ) + cv;
        else
            cv = .225 * ( cv * cv - cv ) + cv;
    }
    return cv;
}



inline unsigned int randi(){ 
	static unsigned int seed = 101;
  	seed = (214013*seed +2531011); 
  	return (seed >>16)&0x7FFF; 
} 
inline float randf(){
	static constexpr unsigned int res = 1024; //jank
	return (randi() % res)/(float)res;
}

extern float __heap_base;

extern "C" float *processAudio(int numSamples){
    constexpr float rate = 44100;
    static float phase = 0;
    float *samples = &__heap_base;
    for(int i = 0; i < numSamples; ++i){
        //generate hats
        float env = 1-mod(2*phase,1); //controls white noise volume
        env *= 1-mod(4*phase,1);
        env *= env;
        samples[i] = .2*env*(2*randf()-1);

        //generate kick
        float envK = 1.f-mod(phase,1.f); //controls sine pitch and volume
        envK = envK*envK*envK*envK*envK*envK*envK*envK*envK*envK; // raise to 10th power lol
        samples[i] += envK*.5*sin(2*PI*220*mod(phase,1)*envK);


        //generate phase modulation synth
        static constexpr float notes[] = {1, 5/4.f, 3/2.f, 15/8.f};
        float interval = notes[(int)(mod(.5*phase,1)*4)];
        float f = sin(phase/2.0)*50*sin(interval*2*PI*55*phase);
        samples[i] += .2*sin(interval*2*PI*220*phase+f);
        phase += 1/rate;
    }
    return samples;
}