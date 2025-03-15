class Spawner {
    constructor(game) {
        this.game = game;

        this.obstacles = [];
        this.obstacleInterval = 1800;
        this.lastSpawnTime = performance.now();
    }

    // Main methods.
    renderObstacles(dt) {
        const now = performance.now();

        // Spawn obstacle if enough time has passed.
        if (now - this.lastSpawnTime >= this.obstacleInterval) {
            this.lastSpawnTime = now;
            this.createObstacle();
        }

        // Update all obstacles.
        this.obstacles.forEach((obstacle, index) => {
            obstacle.update(dt);
            obstacle.draw();

            // Remove obstacles that go off-screen.
            if (obstacle.isOffScreen() && this.obstacles.length > 2) {
                this.obstacles.splice(index, 1);
            }
        });
    }

    // Helper methods.
    createObstacle() {
        let obstacle;
        
        // Prevent three times repeating obstacles.
        let number = Math.random();
        if (this.obstacles.length >= 2 && this.obstacles[this.obstacles.length - 2].constructor.name === this.obstacles[this.obstacles.length - 1].constructor.name) {
            if (this.obstacles[this.obstacles.length - 1].constructor.name === "Fly") {
                number = 0.9;
            } else {
                number = 0.1;
            }
        }
        
        // Calculate x position. The first obstacle enters
        // after some initial delay to make the game fair.
        // Yeah I am bad but I am also the developer so...
        const xPosition = 1.5 * this.game.width;

        // Initialise the obstacle.
        if (number >= 0.5) {
            obstacle = new Snail(this.game);
            obstacle.resize(0, 0);
            obstacle.resize(
                xPosition,
                this.game.background.skyHeight - obstacle.height
            );
        } else {
            obstacle = new Fly(this.game);
            obstacle.resize(0, 0);
            obstacle.resize(
                xPosition,
                this.game.player.homeY - obstacle.height - 10
            );
        }

        this.obstacles.push(obstacle);
    }
}
