/*-----------------------------------------------------------------------------------
PIXI JS
-------------------------------------------------------------------------------------*/

const app = new PIXI.Application({ width: 800, height: 600 });

document.body.appendChild(app.view);

/*-----------------------------------------------------------------------------------
MATTER JS
-------------------------------------------------------------------------------------*/

const { Body, Engine, Bodies, Collision, World, Runner } = Matter;

//create engine matter js
let engine = Engine.create();

//create world
let world = engine.world;

//create runner
let runner = Runner.create()
Runner.run(runner, engine);


class MatterBody{
    constructor(body){
        this.body = body;
        this.dead = false;
        this.graphics = new PIXI.Graphics();        
        this.lineColor ='0xffffff';
        this.fillColor =  "0x" + "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        
        //add to pixi js
        app.stage.addChild(this.graphics);
       
        //add matter world
        World.add(world, this.body);
    }

    draw(){
        this.graphics.clear();
        // draw a shape
        this.graphics.beginFill(this.fillColor);
        this.graphics.lineStyle(1, this.lineColor, 1);

        this.graphics.moveTo(this.body.vertices[0].x, this.body.vertices[0].y);
        for (let i = 0; i < this.body.vertices.length; i+=1) {
            this.graphics.lineTo(this.body.vertices[i].x, this.body.vertices[i].y);            
        }
        this.graphics.lineTo(this.body.vertices[0].x, this.body.vertices[0].y);

        this.graphics.closePath();
        this.graphics.endFill();

    }
    
}

let bodies = [];

bodies.push(new MatterBody(new Bodies.rectangle(400, 0, 800, 50,{ isStatic:true })));
bodies.push(new MatterBody(new Bodies.rectangle(400, 600, 800, 50,{ isStatic:true })));
bodies.push(new MatterBody(new Bodies.rectangle(800, 300, 50, 600,{ isStatic:true })));
bodies.push(new MatterBody(new Bodies.rectangle(0, 300, 50, 600,{ isStatic:true })));

bodies.push(new MatterBody(new Bodies.rectangle(50, 50, 50, 50,{ isStatic:false })));



//loop
app.ticker.add((delta) => {
    
    bodies.forEach(body => {
        body.draw();
    });

});