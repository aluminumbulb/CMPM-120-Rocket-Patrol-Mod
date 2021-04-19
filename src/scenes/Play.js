class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        console.log("playscene created");
    }
    // phaser contained function
    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('ship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.image('bonus', 'assets/bonus_time_sized.png');
        this.load.image('fship', 'assets/quick_ship.png');

    }

    create() {

        //layers are important
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
        ).setOrigin(0, 0);

        this.p1Rocket = new Rocket(
            this,
            (game.settings.players? ((game.config.width / 2)-100) : (game.config.width / 2)),
            game.config.height - borderUISize - borderPadding,
            'rocket',
            0,
            true,
        ).setOrigin(0.5, 0);

        if(game.settings.players){
        this.p2Rocket = new Rocket(
            this,
            (game.config.width / 2) + 100,
            game.config.height - borderUISize - borderPadding,
            'rocket',
            0,
            false,
        ).setOrigin(0.5, 0);
        }

        this.ship1 = new Ships(
            this,
            100,
            200,
            'ship'
        ).setOrigin(0, 0);

        //Only make the second if the player requested two players
        
        this.ship2 = new Ships(
            this,
             300,
            240,
             'ship'
        ).setOrigin(0, 0);
 

        this.ship3 = new Ships(
            this,
            380,
            300,
            'ship'
        ).setOrigin(0, 0);

        this.fastShip = new fShip(
            this,
            Phaser.Math.Between(100,300),
            50,
            'fship'
        ).setOrigin(0,0);


        //Player 1 Key Setup
        p1FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Player 2 Key Setup
        p2FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //green bar
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        scoreConfig.fixedWidth = 0;
        this.gameOver = false;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //Particle Emitter
        this.emitter = this.add.particles('bonus').createEmitter({
            x: 0,
            y: 0,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 2, end: 1 },
            blendMode: 'SCREEN',
            active: false,
            lifespan: 300,
            gravityY: 0
        })

        //Implementing Timer

        this.timeCount = (game.settings.gameTimer/1000); 

        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100

        }

        this.timerRight = this.add.text(game.config.width-borderUISize-borderPadding-100, borderUISize + borderPadding * 2, this.timeCount, timerConfig);
        this.countdown = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if(this.timeCount > 0){
                    this.timeCount--;
                    this.timerRight.text = this.timeCount;
                }
            },
            loop: true,
        });

        //Half Time Speed Boost
        this.time.addEvent({
            delay: (game.settings.gameTimer/2),
            callback: ()=>{
                game.settings.spaceshipSpeed *=2;
            },
        })
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {
            this.p1Rocket.update();
            if(game.settings.players){
                this.p2Rocket.update();
                this.setMultiplayerBorders(this.p1Rocket, this.p2Rocket);
            }
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.fastShip.update();
            this.starfield.tilePositionX -= 4;
        }

        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);
        this.checkCollision(this.p1Rocket, this.fastShip);

        if(game.settings.players){
            this.checkCollision(this.p2Rocket, this.ship1);
            this.checkCollision(this.p2Rocket, this.ship2);
            this.checkCollision(this.p2Rocket, this.ship3);
            this.checkCollision(this.p2Rocket, this.fastShip);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x + rocket.width > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height) {
            rocket.reset();
            this.shipExplode(ship);
        }
    }

    shipExplode(ship) {
        //TIMER ADD HERE
        this.timeCount += 5;

        ship.alpha = 0;
        this.sound.play('sfx_explosion');
        this.emitter.setPosition(ship.x, ship.y);
        this.emitter.active = true;
        this.emitter.explode();
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');//plays animation
        boom.on('animationcomplete', () => {
            
            ship.alpha = 1;//make ship visible
            boom.destroy();//removes sprite
            this.emitter.active = false;
        })
        ship.reset()
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }

    setMultiplayerBorders(rocket1, rocket2){
        console.log("Rocket 1: " +rocket1.x + " Rocket 2:"+rocket2.x);
        //yeah...I gave player one the edge
        rocket2.x = (Phaser.Math.Clamp(rocket2.x, rocket1.x + rocket1.width, game.config.width - borderUISize - borderPadding));
        rocket1.x = (Phaser.Math.Clamp(rocket1.x, borderUISize + borderPadding, rocket2.x-rocket2.width));
    }
}