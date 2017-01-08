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
    this.heartbeatInterval = 50;
    this.speed = 8;

    this.heroLeft = 0;
    this.heroTop = 0;

    this.init = function () {
        var domElem = this.createDomElem();
        return domElem;
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
        this.heroLeft++;
        hero.style.left = (this.heroLeft * this.speed) + 'px';
    };

    this.moveDown = function () {
        $('#hero').addClass('down');
        this.heroTop++;
        hero.style.top = (this.heroTop * this.speed) + 'px';
    };

    this.moveLeft = function () {
        $('#hero').addClass('left');
        this.heroLeft -= 1;
        hero.style.left = (this.heroLeft * this.speed) + 'px';
    };
}

function GameController() {
    var self = this;

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
            case 37: //left
                self.heroObj.moveLeft();
                break;

            case 38: //up
                self.heroObj.moveUp();
                break;

            case 39: // right
                self.heroObj.moveRight();
                break;

            case 40: // down
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