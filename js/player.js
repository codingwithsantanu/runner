class Player {
    constructor(game) {
        this.game = game;

        this.x;
        this.y;
        this.homeY;

        this.width;
        this.height;

        this.baseWidth = 68;
        this.baseHeight = 84;
        
        this.widthTitleScreen;
        this.heightTitleScreen;

        // Images.
        this.jumpImage = document.getElementById("player-jump");
        this.standingImage = document.getElementById("player-standing");
        this.walkImage1 = document.getElementById("player-walk-1");
        this.walkImage2 = document.getElementById("player-walk-2");
        
        this.currentImage = this.walkImage1;
        this.frameX = 0;
        this.animationTimer = 0;
        this.animationInterval = 250; // In ms. 1s = 1000ms.

        this.speedY;
        this.jumpSpeed;
        this.gravity;
    }

    // Main methods.
    update(dt) {
        this.updateAnimationTimer(dt);
        dt /= 1000;

        // Apply gravity.
        if (this.y < this.homeY || this.speedY < 0) {
            this.speedY += dt * this.gravity
            this.y += dt * this.speedY;
        }

        // Prevent sinking below ground.
        if (this.y >= this.homeY) {
            this.y = this.homeY;
            this.speedY = 0;
        }
    }    

    resize(y) {
        const scale = Math.min(
            this.game.width / (2.7 * this.baseWidth),
            this.game.height / (4.3 * this.baseHeight),
            2
        );
        this.width = this.baseWidth * scale;
        this.height = this.baseHeight * scale;
        
        this.x = this.game.width / (0.2 * this.width);
        this.y = y;
        this.homeY = y;

        this.speedY = 0;
        this.gravity = 1000 * this.game.ratio;
        this.jumpSpeed = -800 * this.game.ratio;
        
        // Standing image scaling.
        const scaleTitleScreen = Math.min(
            this.game.width / (2 * this.baseWidth),
            this.game.height / (3 * this.baseHeight)
        );
        this.widthTitleScreen = this.baseWidth * scaleTitleScreen;
        this.heightTitleScreen = this.baseHeight * scaleTitleScreen;
    }

    draw() {
        this.game.context.drawImage(
            this.currentImage,
            0, 0,
            this.baseWidth, this.baseHeight,
            this.x, this.y,
            this.width, this.height
        );

        if (!this.game.debug)
            return;

        this.game.context.strokeRect(
            this.x, this.y,
            this.width, this.height
        );
    }

    // Helper methods.
    updateAnimationTimer(dt) {
        if (this.animationTimer < this.animationInterval) {
            this.animationTimer += dt;

            if (this.y === this.homeY && this.currentImage === this.jumpImage) {
                this.frame = 0;
                this.currentImage = this.walkImage1;
            }
        } else {
            this.animationTimer = 0;
            
            if (this.y < this.homeY || this.speedY < 0) {
                this.currentImage = this.jumpImage;
                return;
            }

            this.frameX++;
            if (this.frameX === 0) {
                this.currentImage = this.walkImage1;
            } else if (this.frameX === 1) {
                this.currentImage = this.walkImage2;
            } else {
                this.frameX = 0;
                this.currentImage = this.walkImage1;
            }
        }
    }

    jump() {
        if (this.y === this.homeY) {
            this.speedY = this.jumpSpeed;
        }
    }

    // Additional helper methods.
    drawStandingImage() {
        this.game.context.drawImage(
            this.standingImage,
            0, 0,
            this.baseWidth, this.baseHeight,
            (this.game.width - this.widthTitleScreen) * 0.5,
            (this.game.height - this.heightTitleScreen) * 0.5,
            this.widthTitleScreen, this.heightTitleScreen
        );
    }
}