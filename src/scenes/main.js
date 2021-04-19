let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let p1FIRE, keyR, keyA, keyD;
let p2FIRE, keyLEFT, keyRIGHT;

/*
Point Breakdown:
The main ship's controls have been changed to a/d and w to fire

Implement a simultaneous two-player mode (30)
    - The menu screen prompts the player to press down to enter two player mode
    - Ship 2 controls with arrow keys
    - Ship Icons and additional instructions show up to indicate this
    - In two player mode, each player has a half of the screen, and will be unable to move
    past one another (but player one can nudge player 2 over)

Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
    - While not replacing the original explosion, when a ship is hit it fires off custom made "+5.00s" 
    sprite to indicate the timer was added to.

Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
    - Straight forward, 5s added to the clock with every destoryed ship. 

Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
    - Made a ship that zig zags down from the top of the screen to the bottom

Display the time remaining (in seconds) on the screen (10)
    - I'll take credit for this if I can, but I get it if it's part of the timing/scoring mechanism

Implement the speed increase that happens after 30 seconds in the original game (5)
    - To accomidate "hard mode" this is done dynamically to be 1/2 of whatever game time is.
    - Speed set to rocket speed*2

Randomize each spaceship's movement direction at the start of each play (5)
    - Ships randomize right to left or left to right every reset
    - Flipped ships sprites
    - Entry point on the screen randomized on y axis
*/