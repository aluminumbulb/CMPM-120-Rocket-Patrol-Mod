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
        //selects a random time to drop the ship (might acutally never drop)
        if(Phaser.Math.Between(0,0)==0){
            this.dropping = true;
        }

        //drops to bottom of screen
        if(this.dropping){
            this.y += this.speed;
            this.x = this.initialX+Math.sin(this.y/10)*30;
            if(this.y>game.config.height+50){
                this.destroy();

                //this.reset();
            }
        }

        console.log(this.y);
    }

    reset(){
        this.dropping = false;

        this.setPosition(
            Phaser.Math.Between(borderUISize + borderPadding, game.config.width),
            this.y = 43
        )
        this.initialX = this.x;
    }
}