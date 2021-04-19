class Ships extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = 25
        this.rtl = true;
        this.speed;
        this.determineSide()
    }


    update(){
        this.x += this.speed;
        //changed parameters to be either side of the game board
        if(this.x<0-50 || this.x>game.config.width+50){
            this.reset();
        }
    }

    reset(){
        this.determineSide()
        if(this.rtl){
            this.x = game.config.width + 50;
        }else{
            this.x = -50;
        }
        this.y = Phaser.Math.Between(borderUISize + borderPadding+50, game.config.height - borderUISize - borderPadding - 50)
        this.alpha = 1;
    }

    determineSide(){
        //flips a coin to determine which side and direction the rockets will start from
        if(Phaser.Math.Between(0,1) == 0){
            if(!this.rtl){
                this.scaleX = 1
            }
            this.rtl = true;
            this.speed = -game.settings.spaceshipSpeed;
        }else{
            if(this.rtl){
                this.scaleX = -1
                
            }
            this.rtl = false;
            this.speed = game.settings.spaceshipSpeed;
        }
    }
}