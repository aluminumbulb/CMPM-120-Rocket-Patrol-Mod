class Ships extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = 25
    }

    update(){
        this.x -= game.settings.spaceshipSpeed;
        if(this.x< -this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}