/**
 * Created by bill on 1/8/17.
 */

function GameController() {
    var self = this;
    this.controlsLeft = 37;
    this.controlsUp = 38;
    this.controlsRight = 39;
    this.controlsDown = 40;

    this.init = function (gameAreaSelector) {
        this.gameArea = $(gameAreaSelector);
        buildRandomMapArray();
        drawMap(randomizedMapArr);
        this.makeHero();
    };

    this.makeHero = function () {
        var hero = new Hero(this);
        this.heroObj = hero;
        var heroDomElem = this.heroObj.init();
        this.gameArea.append(heroDomElem);
    };

    this.handleKeypress = function (e) {

        switch (e.which) {
            case self.controlsLeft:
                self.heroObj.horizontalMove = -1;
                self.heroObj.animationClass = 'left';
                break;

            case self.controlsUp:
                self.heroObj.verticalMove = -1;
                self.heroObj.animationClass = 'up';
                break;

            case self.controlsRight:
                self.heroObj.horizontalMove = 1;
                self.heroObj.animationClass = 'right';
                break;

            case self.controlsDown:
                self.heroObj.verticalMove = 1;
                self.heroObj.animationClass = 'down';
                break;
        }
    };

    this.handleKeyup = function (e) {

        switch (e.which) {
            case self.controlsLeft:
                self.heroObj.horizontalMove = 0;
                break;

            case self.controlsUp:
                self.heroObj.verticalMove = 0;
                break;

            case self.controlsRight:
                self.heroObj.horizontalMove = 0;
                break;

            case self.controlsDown:
                self.heroObj.verticalMove = 0;
                break;
        }
    };

    this.addEventHandlers = function () {
        $(document).keydown(game.handleKeypress);
        $(document).keyup(game.handleKeyup);
    }
}