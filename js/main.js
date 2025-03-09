window.addEventListener("load", function() {
    const canvas = document.getElementById("mainCanvas");
    const context = canvas.getContext("2d");

    const game = new Game(canvas, context);
    
    // Main game loop.
    let lastTime = performance.now();
    function animate(currentTime = performance.now()) {
        const dt = currentTime - lastTime;
        lastTime = currentTime;

        context.clearRect(0, 0, this.width, this.height);
        game.render(dt);

        requestAnimationFrame(animate);
    }

    animate();
});