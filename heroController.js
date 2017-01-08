/**
 * Created by bill on 1/8/17.
 */

function Hero(parent) {
    var self = this;
    this.parent = parent;
    this.domElem = null;
    this.name = 'Mushie';
    this.hitpoints = 10;
    this.speed = 2;

    this.heartbeatInterval = 15;
    this.animationClass = '';
    this.horizontalMove = 0;
    this.verticalMove = 0;
    this.xPos = 0;
    this.yPos = 0;

    this.init = function () {
        var domElem = this.createDomElem();
        this.startHeartbeat();
        return domElem;
    };

    this.createDomElem = function () {
        this.domElem = $('<div>', {
                id: 'hero',
                class: 'stand',
                css: {
                    top: '0px',
                    left: '0px'
                }
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
        this.domElem.append(nameDiv, hpDiv);
        return this.domElem;
    };

    this.startHeartbeat = function () {
        this.heartbeat = setInterval(this.performHeartbeat, this.heartbeatInterval);
    };

    this.stopHeartbeat = function () {
        clearInterval(this.heartbeat);
    };

    this.performHeartbeat = function () {
        // Stand still if no keys pressed
        if (self.horizontalMove == 0 && self.verticalMove == 0) {
            self.standStill();
        } else {
            self.move();
        }
    };

    this.standStill = function(){
        self.domElem.removeClass();
        self.domElem.addClass('stand');
        self.animationClass = 'stand';
    };

    this.move = function () {
        this.domElem.addClass(this.animationClass);
        this.yPos += this.verticalMove;
        this.xPos += this.horizontalMove;
        this.domElem.css({
            top: (this.yPos * this.speed) + 'px',
            left: (this.xPos * this.speed) + 'px'
        });
    };
}
