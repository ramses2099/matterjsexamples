const canvas = document.getElementById('divcanva');

/*--------------------------------------------------------
Matter js
----------------------------------------------------------*/

const { Engine, Render, Runner, Body, Bodies, Composite, Mouse, MouseConstraint, Events} = Matter;

//engine
const engine = Engine.create();

//render
const render = Render.create({
    element: canvas,
    engine: engine,
    options:{
        width: 800,
        height: 600
    }
});


const sprite = {
    texture:'images/ship_0009.png',
    xScale: 2,
    yScale: 2,
    xOffset: 0,
    yOffset: 0
}


//
render.options.wireframes = false;


/*--------------------------------------------------------
Mouse
----------------------------------------------------------*/
const mouse = Mouse.create(render.canvas);
const mouseContraint = MouseConstraint.create(engine,{
    mouse:mouse,
    constraint:{
        render: {visible:false}
    }
});
render.mouse = mouse;


/*--------------------------------------------------------
Keyboard
----------------------------------------------------------*/
const keyHandlers = {
    ArrowUp:() => {
        Body.applyForce(boxSprite,
            {x: boxSprite.position.x, y: boxSprite.position.y},
            {x:0 , y: -0.02});
    },
    ArrowDown:() => {
        Body.applyForce(boxSprite,
            {x: boxSprite.position.x, y: boxSprite.position.y},
            {x:0 , y: 0.02});
    },
    ArrowRight:() => {
        Body.applyForce(boxSprite,
            {x: boxSprite.position.x, y: boxSprite.position.y},
            {x:0.02 , y: 0});
    },
    ArrowLeft:() => {
        Body.applyForce(boxSprite,
            {x: boxSprite.position.x, y: boxSprite.position.y},
            {x:-0.02 , y: 0});
    },
};

const keysDown = new Set();
document.addEventListener("keydown", function(event){
    keysDown.add(event.code);
});

document.addEventListener("keyup", function(event){
    keysDown.delete(event.code);
});

Events.on(engine, "beforeUpdate", function(event){
    //keyboard event
    [...keysDown].forEach(k=>{
        keyHandlers[k]?.();
    });


});



/*--------------------------------------------------------
Bodies
----------------------------------------------------------*/


// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);

var boxSprite = Bodies.rectangle(350, 50, 32, 32 ,{
    inertia: Infinity,
    friction: 0.1,
    render:{
        sprite: sprite
    }
});

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, render: { fillStyle: '#6F2020' }});
var left = Bodies.rectangle(0, 0, 10, 2000, { isStatic: true, render: { fillStyle: '#6F2020' }});
var right = Bodies.rectangle(800, 0, 10, 2000, { isStatic: true, render: { fillStyle: '#6F2020' }});


// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, left, right, boxSprite, mouseContraint]);


// run the renderer
Render.run(render);

// create runner
var runner = Runner.create({
    delta: 1000 / 60,
    isFixed: false,
    enabled: true
});

// run the engine
Runner.run(runner, engine);
