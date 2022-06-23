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
    static float phase = 0;
    float *samples = &__heap_base;
    for(int i = 0; i < numSamples; ++i){
        bool oddMeasure = mod(.25*phase,2)>1;

        //generate hats
        float envHats = 1-mod(2*phase,1); //controls white noise volume
        envHats *= 1-mod(4*phase,1);
        envHats *= envHats;
        samples[i] = .14*envHats*(2*randf()-1);

        //generate kick
        float envKick = 1.f-mod(phase,1.f); //controls sine pitch and volume
        envKick = envKick*envKick*envKick*envKick*envKick*envKick*envKick*envKick*envKick*envKick; // raise to 10th power lol
        samples[i] += envKick*.5*sin(2*PI*220*mod(phase,1)*envKick);


        //generate phase modulation bass
        static constexpr float notesBass[] = {1, 5/4.f, 3/2.f, 15/8.f, 9/8.f, 729/512.f, 5/3.f, 15/8.f};
        float intervalBass = (oddMeasure?.5:1)*notesBass[(int)(mod(.25*phase,1)*8)];
        float f = sin(phase/2.0)*30*sin(intervalBass*2*PI*55*phase);
        samples[i] += .2*sin(intervalBass*2*PI*220*phase+f);

        //generate melody synth
        static constexpr float notesMelody[] = {3/2.f, 3/2.f*9/3.f, 3/2.f*9/3.f*9/8.f, 3/2.f*5/3.f};
        if(oddMeasure){
            float intervalMelody = .5*notesMelody[(int)(mod(4*phase,1)*4)];
            float vibrato = .4*sin(phase*2*PI*6);
            float envMelody = 1-mod(4*phase,1); //volume
            samples[i] += envMelody*.1*(mod(intervalMelody*2*PI*110*phase+vibrato,1)-.5);
        }
        
        phase += 1/(float)numSamples;
    }
    return samples;
}