/**
 * Created by Bill on 1/4/17.
 */

var game;

$(document).ready(function () {
    console.log('doc is ready');
    game = new GameController();
    game.init('#gameArea');
    game.addEventHandlers();
});

function Hero(parent) {
    this.parent = parent;
    this.name = 'Mushie';
    this.hitpoints = 10;
    this.speed = 8;

    this.heartbeatInterval = 50;
    this.animationClass = '';
    this.horizontalMove = 0;
    this.verticalMove = 0;
    this.heroLeft = 0;
    this.heroTop = 0;

    this.init = function () {
        var domElem = this.createDomElem();
        return domElem;
    };

    this.startHeartbeat = function(){

    };

    this.stopHeartbeat = function(){

    };

    this.performHeartbeat = function(){
        // every heartbeat move character
        if(this.heroLeft != 0){
            this.heroLeft += this.heroLeft;
        }
    };

    this.createDomElem = function () {
        this.domElem = $('<div>', {
                id: 'hero',
                class: 'stand'
            }
        );
        var nameDiv = $('<div>', {
                id: 'heroName',
                class: 'heroUI',
                text: this.name
            }
        );
        var hpDiv = $('<div>', {
                id: 'heroHP',
                class: 'heroUI',
                text: this.hitpoints
            }
        );
        this.domElem.prepend(nameDiv, hpDiv);
        return this.domElem;
    };

    this.moveUp = function () {
        $('#hero').addClass('up');
        this.heroTop -= 1;
        hero.style.top = (this.heroTop * this.speed) + 'px';
    };

    this.moveRight = function () {
        $('#hero').addClass('right');
        // this.heroLeft++;
        this.heroLeft += this.horizontalMove;

        hero.style.left = (this.heroLeft * this.speed) + 'px';
    };

    this.moveDown = function () {
        $('#hero').addClass('down');
        this.heroTop++;
        hero.style.top = (this.heroTop * this.speed) + 'px';
    };

    this.moveLeft = function () {
        $('#hero').addClass('left');
        // this.heroLeft += 1;
        this.heroLeft += this.horizontalMove;

        hero.style.left = (this.heroLeft * this.speed) + 'px';
        console.log('this.heroLeft is : ', this.heroLeft);
    };
}

function GameController() {
    var self = this;
    this.controlsLeft = 37;
    this.controlsUp = 38;
    this.controlsRight = 39;
    this.controlsDown = 40;

    this.init = function (gameAreaSelector) {
        this.gameArea = $(gameAreaSelector);
        this.makeHero();
    };

    this.makeHero = function () {
        var hero = new Hero(this);
        this.heroObj = hero;
        var heroDomElem = this.heroObj.init();
        this.gameArea.append(heroDomElem);
    };

    this.handleKeypress = function (e) {
        console.log(e.which);

        switch (e.which) {
            case self.controlsLeft:
                console.log('yup');
                self.heroObj.horizontalMove = -1;
                self.heroObj.animationClass = 'left';
                self.heroObj.moveLeft();
                break;

            case self.controlsUp:
                self.heroObj.verticalMove = -1;
                self.heroObj.animationClass = 'up';
                self.heroObj.moveUp();

                break;

            case self.controlsRight:
                self.heroObj.horizontalMove = 1;
                self.heroObj.animationClass = 'right';
                self.heroObj.moveRight();

                break;

            case self.controlsDown:
                self.heroObj.verticalMove = 1;
                self.heroObj.animationClass = 'down';
                self.heroObj.moveDown();

                break;
        }
    };

    this.handleKeyup = function () {
        $('#hero').removeClass();
        $('#hero').addClass('stand');
    };

    this.addEventHandlers = function () {
        $(document).keydown(game.handleKeypress);
        $(document).keyup(game.handleKeyup);
    }
}