class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("bedroom", "image/Your Room.png");
    }  

    onEnter() {
        // Load the background image
        let bg = this.add.image(0, 0, "bedroom");

        // Set the position to the center of the canvas
        bg.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY);

        let scaleFactor = (this.cameras.main.width - this.w * 0.25) / bg.width;

        // Scale the image to fit the canvas
        bg.setScale((this.cameras.main.width - this.w * 0.25) / bg.width, this.cameras.main.height / bg.height);

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let phone = this.add.text(this.w * 0.5, this.w * 0.1, "📱 phone")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's your mobile phone.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the phone.");
                this.gainItem('phone');
                this.tweens.add({
                    targets: phone,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => phone.destroy()
                });
            })

            let knife = this.add.text(this.w * 0.1, this.w * 0.1, "📱 knife")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a knife.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the knife.");
                this.gainItem('knife');
                this.tweens.add({
                    targets: knife,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => knife.destroy()
                });
            })

            let light = this.add.text(this.w * 0.3, this.w * 0.1, "📱 flashlight")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a flashlight.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the flashlight.");
                this.gainItem('light');
                this.tweens.add({
                    targets: light,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => light.destroy()
                });
            })
        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 door")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go outside?");
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })
    }

    resizeBackground(width, height) {
        this.background.setDisplaySize(width - (width * 0.25), height);
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

