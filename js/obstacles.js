// GENERIC OBSTACLE CLASS.
class Obstacle {
    constructor(game) {
        this.game = game;

        this.x;
        this.y;
        this.homeX;
        this.homeY;

        this.width;
        this.height;

        this.baseWidth = 50;
        this.baseHeight = 50;

        // Images.
        this.images = [null]

        this.frameX = 0;
        this.currentImage = this.images[this.frameX];
        this.animationTimer = 0;
        this.animationInterval = 500; // In ms. 1s = 1000ms.

        this.speedX;

        this.collided = false;
    }

    // Main methods.
    update(dt) {
        this.updateAnimationTimer(dt);

        // Move the enemy.
        this.x -= dt * this.speedX;

        // Handle collisions.
        if (!this.collided && this.game.checkCollision(this, this.game.player)) {
            this.collided = true;
            this.game.gameOver = true;
        }

        // Reset collision flag if game was restarted.
        if (this.collided && !this.gameOver) {
            this.collided = false;
        }
    }

    resize(x, y) {
        // General images scaling.
        const scale = Math.min(
            this.game.width / (2.7 * this.baseWidth),
            this.game.height / (4.3 * this.baseHeight),
            2 // 2 is the maximum scale.
        );
        this.width = this.baseWidth * scale;
        this.height = this.baseHeight * scale;
        
        this.x = x;
        this.y = y;
        this.homeX = x;
        this.homeY = y;

        this.speedX = 0.3 * this.game.ratio;
    }

    draw() {
        if (this.images[0] === null)
            return;

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
        } else {
            this.animationTimer = 0;
            this.frameX++;
            if (this.frameX >= this.images.length)
                this.frameX = 0;
            this.currentImage = this.images[this.frameX];
        }
    }

    isOffScreen() {
        return this.x <= -this.width;
    }
}


// INHERITED OBSTACLE CLASSES.
class Snail extends Obstacle {
    constructor(game) {
        super(game);

        this.baseWidth = 72;
        this.baseHeight = 36;

        this.images = [
            document.getElementById("snail-1"),
            document.getElementById("snail-2")
        ]
        this.currentImage = this.images[this.frameX];
    }

    resize(x, y) {
        super.resize(x, y);
    }
}

class Fly extends Obstacle {
    constructor(game) {
        super(game);

        this.baseWidth = 80;
        this.baseHeight = 40;

        this.images = [
            document.getElementById("fly-1"),
            document.getElementById("fly-2")
        ]
        this.currentImage = this.images[this.frameX];
    }

    resize(x, y) {
        super.resize(x, y);
    }
}