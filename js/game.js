class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;

        this.width;
        this.height;

        // Initialise Game variables.
        this.debug = false;
        this.gameOver = true;

        this.score = null;
        this.scoreMultiplierEverySecond = 10;

        this.ratio;
        this.baseHeight = 720;

        this.player = new Player(this);
        this.spawner = new Spawner(this);
        this.background = new Background(this);

        // Handle window resize events ensuring Full Screen.
        this.resize(window.innerWidth, window.innerHeight);
        window.addEventListener("resize", event => {
            this.resize(
                event.target.innerWidth,
                event.target.innerHeight
            );
        }); // Calls resize() for current window dimensions.

        // Other event listeners.
        window.addEventListener("touchstart", event => {
            this.player.jump();
            if (this.gameOver) {
                this.gameOver = false;
                this.resize(this.width, this.height);
            }
        });

        window.addEventListener("click", event => {
            this.player.jump();
            if (this.gameOver) {
                this.gameOver = false;
                this.resize(this.width, this.height);
            }
        });
    }

    // Main methods for handling Game logic.
    resize(width, height) {
        if (width === this.width && height === this.height) {
            // NOTE: width and height will stay same only
            // if dynamically called.
            this.score = 0;
        }

        this.canvas.width = width;
        this.canvas.height = height;

        this.width = width;
        this.height = height;

        this.ratio = height / this.baseHeight;

        this.context.fillStyle = "Red";
        this.context.strokeStyle = "Gray";
        this.context.lineWidth = 2;

        this.background.resize();
        this.player.resize(0);
        this.player.resize(this.background.skyHeight - this.player.height);
        // this.spawner.resetObstacles();
    }

    render(dt) {
        if (!this.gameOver) {
            this.score += this.scoreMultiplierEverySecond * (dt / 1000);

            this.background.draw();
            
            this.spawner.renderObstacles(dt);
            
            this.player.update(dt);
            this.player.draw();

            this.displayScore();

        } else {
            this.displayGameOverScreen();
            this.spawner.obstacles = [];
        }
    }


    // Helper methods.
    displayGameOverScreen() {
        // Background color.
        this.context.fillStyle = "rgb(94, 129, 162)";
        this.context.fillRect(0, 0 , this.width, this.height);

        // Player standing image.
        this.player.drawStandingImage();

        // Game name text.
        let WIDTH = this.width - this.player.widthTitleScreen;
        if (this.width - this.player.widthTitleScreen > this.player.widthTitleScreen) {
            WIDTH = this.width * 0.5;
        }
        const HEIGHT = 0.35 * (this.height - this.player.heightTitleScreen);
        const SCORE = (this.score !== null)? `Your Score: ${Math.round(this.score)}` : "Tap anywhere to begin!";
        const COLOR = "rgb(111, 196, 169)";

        this.displayText(
            "Pixel Runner",
            WIDTH,
            HEIGHT,
            COLOR
        );

        // Game Score Text.
        this.displayText(
            SCORE,
            WIDTH,
            this.height - HEIGHT,
            COLOR
        );
    }

    displayText(text, x, y, color) {
        this.context.save();

        const margin = 3;
        const adjustedFactor = 0.35;
        const fontSize = Math.min(
            Math.round(this.width / (text.length * adjustedFactor + 2 * margin)),
            50
        );
        
        this.context.font = `${fontSize}px Consolas`;
        this.context.fillStyle = color;

        this.context.textAlign = "center";
        this.context.textBaseline = "middle";

        this.context.fillText(
            text,
            x, y
        );

        this.context.restore();
    }

    displayScore() {
        this.context.save();

        const text = `Score: ${Math.floor(this.score)}`;

        this.context.font = `30px Consolas`;
        this.context.fillStyle = "Black";

        this.context.textAlign = "left";
        this.context.textBaseline = "middle";

        this.context.fillText(
            text,
            20,
            30
        );

        this.context.restore();
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect2.x < rect1.x + rect1.width &&
            rect1.y < rect2.y + rect2.height &&
            rect2.y < rect1.y + rect1.height
        );
    }
}
