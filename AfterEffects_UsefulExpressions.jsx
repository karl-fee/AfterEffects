
//Inertial Bounce
amp = .05;
freq = 2.0;
decay = 4.0;
n = 0;
time_max = 4;
if (numKeys > 0){
n = nearestKey(time).index;
if (key(n).time > time){
n--;
}}
if (n == 0){ t = 0;
}else{
t = time - key(n).time;
}
if (n > 0 && t < time_max){
v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}else{value}


//Autofade: Add to opacity
transition = 20;       // transition time in frames
if (marker.numKeys<2){
tSecs = transition / ( 1 / thisComp.frameDuration); // convert to seconds
linear(time, inPoint, inPoint + tSecs, 0, 100) - linear(time, outPoint - tSecs, outPoint, 0, 100)
}else{
linear(time, inPoint, marker.key(1).time, 0, 100) - linear(time, marker.key(2).time, outPoint, 0, 100)
}


//Snap zoom in and out: apply to scale
snapScale = 300; //percent of scale to zoom
trans = 4; //  transition time in frames
trans = trans * thisComp.frameDuration;
inTrans  = easeOut(time, inPoint, inPoint + trans, [snapScale,snapScale], [0,0]);
outTrans = easeIn(time, outPoint, outPoint - trans, [0,0], [snapScale, snapScale]);
value+ inTrans + outTrans
//If you prefer to use Z space position instead of scale, try this one:

zoom = 5000; //distance to zoom
trans = 4; //  transition time in frames
trans = trans * thisComp.frameDuration;

inTrans  = easeIn(time, inPoint, inPoint + trans, [0,0,zoom], [0,0,0]);
outTrans = easeOut(time, outPoint, outPoint - trans*2, [0,0,0], [0,0,zoom]);
value+ inTrans - outTrans


// Y Axis Jitter
probability = 8 ;  //higher is less likely
pos = 50;
val  = random(-probability-2, 1);
m = clamp(val, 0, 1);
y = wiggle(10, pos*m)-position;
value + [0, y[1]]


// To Comp
layer = thisComp.layer("Null 1")
layer.toComp([0,0,0])
//Note: I intentionally left off the semicolon, as you technically don’t need it in this case. Therefore, all you need to do is pickwhip your layer where the “layer =” variable is.