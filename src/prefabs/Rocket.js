class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame, player)
        scene.add.existing(this);
        this.movementSpeed = 3;//give the rocket some oomph
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.p1 = player;
    }

    update() {
        if (this.isFiring) {
            this.y -= this.movementSpeed;
            if (this.y < borderUISize * 3) {
                this.reset();
            }
        } else {
            //This is my method to update succinctly, if the rocket is
            //player one, it responds to one key, or responds to the other if not
            if (this.p1 ? keyA.isDown : keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }

            if (this.p1 ? keyD.isDown : keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }
            if (Phaser.Input.Keyboard.JustDown(this.p1 ? p1FIRE : p2FIRE)) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width - borderUISize - borderPadding)
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }

}
