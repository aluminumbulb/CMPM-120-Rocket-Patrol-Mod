class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', '/assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.image('rocket', 'assets/rocket.png');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'P1: Use (A) and (D) Keys to move & (W) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = '#3F9EFC';
        menuConfig.color = '#000';
        
        //Second player select prompts
        this.add.text(game.config.width/2, game.config.height/2+100 + borderUISize +
        borderPadding, '↓    ', menuConfig).setOrigin(.5);

        this.p2Text = this.add.text(game.config.width/2, game.config.height-borderPadding-borderUISize, '',
        menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyDown =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.player1 = this.add.sprite((game.config.width/2)+0, game.config.height/2+100 + borderUISize +
        borderPadding, 'rocket')

        this.player2 = this.add.sprite((game.config.width/2)+20, game.config.height/2+100 + borderUISize +
        borderPadding, 'rocket')

        this.player2.alpha = 0;

        this.players = false;

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000,
              players: this.players    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000,
              players: this.players      
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if(Phaser.Input.Keyboard.JustDown(this.keyDown)){
            //adds or removes second player
            this.togglePlayers();
          }
    }
    //This activates and deactivates the menu prompts for the second player
    togglePlayers(){
      this.players = !this.players;
      if(this.players){
        this.player2.alpha = 1;
        this.p2Text.text = 'P2: Use ← and → Keys to move & ↑ to fire';
      }else{
        this.player2.alpha = 0;
        this.p2Text.text = '';
      }
    }
  
}