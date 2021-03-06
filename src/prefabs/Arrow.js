// Arrow prefab
class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track arrow's firing status
        this.moveSpeed = 3;         // pixels per frame

        this.sfxArrow = scene.sound.add('sfx_shoot'); // add arrow sfx
    }

    update () {
        // left/right movement
        if(!this.isFiring) {
            if( keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxArrow.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed+1;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset arrow to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}