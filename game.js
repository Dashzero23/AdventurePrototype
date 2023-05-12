class firstRoom extends AdventureScene {
    constructor() {
        super("firstRoom", "Your studio");
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
        // Scale the image to fit the canvas
        bg.setScale((this.cameras.main.width - this.w * 0.25) / bg.width, this.cameras.main.height / bg.height);

        let bedText = this.add.text(0, this.h * 0.8, " 🛏️ Bed")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Your comfy bed\nBack to sleep?");
            })
            .on('pointerdown', () => {
                this.showMessage("Lying down.");
                this.gotoScene('neutral');
            })
            
        let bed =  this.add.rectangle(0, this.h * 0.85, this.w * 0.11, this.h * 0.05).setOrigin(0, 0).setFillStyle(0x444, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Your comfy bed\nBack to sleep?");
            })
            .on('pointerdown', () => {
                this.showMessage("Lying down.");
                this.gotoScene('neutral');
            })

        let comp = this.add.text(this.w * 0.6, this.w * 0.15, " 💻 computer")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => this.showMessage("Your trusty PC."))
            .on('pointerdown', () => {
                this.showMessage("Too late to get online!");
                this.tweens.add({
                    targets: comp,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let phone = this.add.text(this.w * 0.58, this.h * 0.6, "📱 phone")
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

        let door = this.add.text(this.w * 0.05, this.h * 0.15, "🚪 door")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go outside?");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                door.setText("🚪 Going out");
                this.gotoScene('outside');
            })
        this.tweens.add({
                targets: door,
                x: '+=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });
    }

    resizeBackground(width, height) {
        this.background.setDisplaySize(width - (width * 0.25), height);
    }
}

class outside extends AdventureScene {
    constructor() {
        super("outside", "Outside.");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("out", "image/outside.png");
    }  

    onEnter() {

        let bg = this.add.image(0, 0, "out");

        // Set the position to the center of the canvas
        bg.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY);
        // Scale the image to fit the canvas
        bg.setScale((this.cameras.main.width - this.w * 0.25) / bg.width, this.cameras.main.height / bg.height);

        this.add.text(0, this.h * 0.9, "Just go back")
            .setFontSize(this.s * 2)
            .setColor("#ffffff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's pretty cold out here.");
            })
            .on('pointerdown', () => {
                this.gotoScene('firstRoom');
            });

            let door =  this.add.rectangle(this.w * 0.65, this.h * 0.55, this.w * 0.1, this.h * 0.55).setOrigin(0, 0).setFillStyle(0x885800, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go through the backdoor?");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                doorText.setText("🚪 Going in");
                this.gotoScene('hall');
            })

            let doorText = this.add.text(this.w * 0.55, this.h * 0.5, "🚪 Back door ⬇️")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go through the back door?");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                doorText.setText("🚪 Going in");
                this.gotoScene('hall');
            })
            this.tweens.add({
                targets: doorText,
                y: '+=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            let FrontdoorText = this.add.text(this.w * 0.12, this.h * 0.6, "    ⬆️\n🚪 Front door")
            .setFontSize(this.s * 2)
            .setColor("#ffffff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go through the front door?");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                FrontdoorText.setText("🚪 Going through\nthe front door");
                this.gotoScene('kitchen');
            })
            this.tweens.add({
                targets: FrontdoorText,
                y: '-=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });
    }
}

class Hall extends AdventureScene {
    constructor() {
        super("hall", "Hallway.");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("hall", "image/hall.png");
    }  

    onEnter() {

        let bg = this.add.image(0, 0, "hall");

        // Set the position to the center of the canvas
        bg.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY);
        // Scale the image to fit the canvas
        bg.setScale((this.cameras.main.width - this.w * 0.25) / bg.width, this.cameras.main.height / bg.height);

        this.add.text(0, this.h * 0.9, "Just go back")
            .setFontSize(this.s * 2)
            .setColor("#000000")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I should go back to my room.");
            })
            .on('pointerdown', () => {
                this.gotoScene('outside');
            });

            let text = this.add.text(this.w * 0.5, this.h * 0.2, "🚪 Living room ➡️")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go to the living room");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                text.setText("🚪 Going in");
                this.gotoScene('final');
            })

            this.tweens.add({
                targets: text,
                x: '-=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            let door =  this.add.rectangle(this.w * 0.15, this.h * 0.55, this.w * 0.15, this.h * 0.55).setOrigin(0, 0).setFillStyle(0x6B4E32, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Your housemate's room");
            })
            .on('pointerdown', () => {
                this.showMessage("Don't enter without permission!");
            })

            let light = this.add.text(this.w * 0.5, this.h * 0.65, "flashlight\n🔦")
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

    }
}

class Kitchen extends AdventureScene {
    constructor() {
        super("kitchen", "Kitchen.");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("bg", "image/kitchen.png");
    }  

    onEnter() {

        let bg = this.add.image(0, 0, "bg");

        // Set the position to the center of the canvas
        bg.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY);
        // Scale the image to fit the canvas
        bg.setScale((this.cameras.main.width - this.w * 0.25) / bg.width, this.cameras.main.height / bg.height);

        this.add.text(0, this.h * 0.9, "Just go back")
            .setFontSize(this.s * 2)
            .setColor("#000000")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I should go back to my room.");
            })
            .on('pointerdown', () => {
                this.gotoScene('hall');
            });

            let text = this.add.text(this.w * 0.5, this.h * 0.2, "🚪 Living room ➡️")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go to the living room");
            })
            .on('pointerdown', () => {
                this.showMessage("*squeak*");
                text.setText("🚪 Going in");
                this.gotoScene('final');
            })

            this.tweens.add({
                targets: text,
                x: '-=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            let plates =  this.add.rectangle(this.w * 0.225, this.h * 0.47, this.w * 0.1, this.h * 0.1).setOrigin(0, 0).setFillStyle(0xffffff, 0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Dirty plates from last night, looks like someone didn't do dish.");
            })
            .on('pointerdown', () => {
                this.showMessage("You are too lazy to help them clean up.");
            })

            let cabinet1 =  this.add.rectangle(this.w * 0.25, this.h * 0.7, this.w * 0.1, this.h * 0.23).setOrigin(0, 0).setFillStyle(0xffffff, 0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("An empty cabinet, seems like someone just looked through it.");
            })
            
            let cabinet2 =  this.add.rectangle(this.w * 0.42, this.h * 0.7, this.w * 0.1, this.h * 0.23).setOrigin(0, 0).setFillStyle(0xffffff, 0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("An empty cabinet, seems like someone just looked through it.");
            })

            let cabinet3 =  this.add.rectangle(this.w * 0.59, this.h * 0.7, this.w * 0.1, this.h * 0.23).setOrigin(0, 0).setFillStyle(0xffffff, 0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("An empty cabinet, seems like someone just looked through it.");
            })

            let knife = this.add.text(this.w * 0.5, this.h * 0.5, "Knife\n🔪")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a kitchen knife.")
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

    }
}

class LivingRoom extends AdventureScene {
    constructor() {
        super("final", "Living Room.");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("main", "image/main.png");
        this.load.image("robber", "image/robber.png");
    }  

    onEnter() {

        let mainRoom = this.add.image(0, 0, "main");

        // Set the position to the center of the canvas
        mainRoom.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY);
        // Scale the image to fit the canvas
        mainRoom.setScale((this.cameras.main.width - this.w * 0.25) / mainRoom.width, this.cameras.main.height / mainRoom.height);

        let flashed = false

        let rob = this.add.image(0, 0, "robber")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("A ROBBER!");
            })
            .on('pointerdown', () => {
                if (this.hasItem("knife")) {
                    this.showMessage("You stabbed the robber");
                    this.tweens.add({
                        targets: rob,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        onComplete: () => rob.destroy()
                    });
                    this.gotoScene('good')
                }
                else if (this.hasItem("light")) {
                    this.showMessage("You temporarily blind the robber");
                    flashed = true;
                }
                else if (this.hasItem("phone")) {
                    this.showMessage("You called the police, but the robber notice you");
                    this.tweens.add({
                        targets: rob,
                        scale: 3, // zoom in by a factor of 2
                        duration: 1000, // 1 second duration
                        ease: 'Power2', // easing function
                        onComplete: () => this.gotoScene('bad')
                    });
                }
                else {
                    this.showMessage("The robber notice you");
                    this.tweens.add({
                        targets: rob,
                        scale: 3, // zoom in by a factor of 2
                        duration: 1000, // 1 second duration
                        ease: 'Power2', // easing function
                        onComplete: () => this.gotoScene('bad')
                    });
                }
            })

        rob.setPosition(this.cameras.main.centerX - (this.w * 0.125), this.cameras.main.centerY + this.h * 0.1);

        rob.setScale((this.cameras.main.width - this.w * 0.25) / mainRoom.width, this.cameras.main.height / mainRoom.height);
        
        let text = this.add.text(this.w * 0, this.h * 0.2, "⬅️ Kitchen 🚪")
            .setFontSize(this.s * 2)
            .setColor("#0000ff")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Run to the kitchen");
            })
            .on('pointerdown', () => {
                if (flashed == true) {
                this.showMessage("Running to the kitchen");
                text.setText("Going in 🚪");
                this.gotoScene('kitchen');
                }
                else{
                    this.showMessage("Have to distract the robber first!");
                }
            })

            this.tweens.add({
                targets: text,
                x: '-=10',
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "It's midnight and you woke up from a loud sound!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('firstRoom'));
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
        this.input.on('pointerdown', () => this.scene.start('firstRoom'));
    }
}

class Neutral extends Phaser.Scene {
    constructor() {
        super('neutral');
    }
    create() {
        this.add.text(50, 50, "You went back to sleep!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('firstRoom'));
    }
}

class Good extends Phaser.Scene {
    constructor() {
        super('good');
    }
    create() {
        this.add.text(50, 50, "You protected yourself from the robber!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('firstRoom'));
    }
}

class Bad extends Phaser.Scene {
    constructor() {
        super('bad');
    }
    create() {
        this.add.text(50, 50, "The robber killed you!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('firstRoom'));
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, firstRoom, outside, Hall, Kitchen, LivingRoom, Neutral, Good, Bad, Outro],
    title: "Adventure Game",
});

