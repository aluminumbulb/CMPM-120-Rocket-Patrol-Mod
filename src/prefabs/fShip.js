class fShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = 100
        this.speed = 5;
        this.initialX = this.x;
        this.dropping = false;
    }

    update(){
        if(Phaser.Math.Between(0,100)==0){
            this.dropping = true;
        }
        if(this.dropping){
            this.y += this.speed;
            this.x = this.initialX+Math.sin(this.y/10)*30;
            if(this.y>game.config.height+50){
                this.reset();
            }
        }
    }

    reset(){
        console.log("Kill me");
        this.dropping = false;

        this.setPosition(
            Phaser.Math.Between(borderUISize + borderPadding, game.config.width),
            this.y = 50
        )
        this.initialX = this.x;
        
    }
}