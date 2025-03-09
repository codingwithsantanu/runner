class Background {
    constructor(game) {
        this.game = game;

        this.skyWidth;
        this.skyHeight;
        this.skyBaseWidth = 800;
        this.skyBaseHeight = 300;

        this.groundWidth;
        this.groundHeight;
        this.groundBaseWidth = 800;
        // ORIGINAL: this.groundBaseHeight = 168;
        this.groundBaseHeight = 80;

        this.skyImage = document.getElementById("sky");
        this.groundImage = document.getElementById("ground");
    }

    // Main methods.
    resize() {
        /* NOTE: These calculations were done by me for
         | finding the perfect approach for this game.
         | 
         | total = sky + gnd
         | sky = 300
         | gnd = 168
         | => 468 = sky + gnd
         | sky = 300 / 468 = 0.64
         | gnd = 168 / 468 = 0.36
         |
         | height = 767
         | sky.h = 767 * 0.64 = 491
         | gnd.h = 767 * 0.36 = 275 (1px loss)
         | Or, gnd.h = 767 - 491 = 276
        */

        const totalHeight = this.skyBaseHeight + this.groundBaseHeight;
        const skyPercentage = this.skyBaseHeight / totalHeight;
        // NOT NEEDED: const groundPercentage = this.groundBaseHeight / totalHeight;
        
        this.skyHeight = Math.floor(this.game.height * skyPercentage);
        this.skyWidth = (this.skyHeight / this.skyBaseHeight) * this.skyBaseWidth;
        
        this.groundHeight = this.game.height - this.skyHeight;
        this.groundWidth = (this.groundHeight / this.groundBaseHeight) * this.groundBaseWidth;
    }

    draw() {
        this.game.context.drawImage(
            this.skyImage,

            0, 0,
            this.skyBaseWidth, this.skyBaseHeight,

            0, 0,
            this.skyWidth, this.skyHeight
        );

        this.game.context.drawImage(
            this.groundImage,

            0, 0,
            this.groundBaseWidth, this.groundBaseHeight,

            0, this.skyHeight,
            this.groundWidth, this.groundHeight
        );
    }
}