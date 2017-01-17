/**
 * Created by bill on 1/8/17.
 */

function Hero(parent,name) {
    var self = this;
    this.parent = parent;
    this.domElem = null;
    this.name = name;
    this.hitpoints = 10;
    this.speed = 3;

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
        var heroUI = $('<div>', {
                id: 'heroUI',
            }
        );
        var nameDiv = $('<div>', {
                id: 'heroName',
                class: 'heroUI',
                text: this.name
            }
        );
        // var hpDiv = $('<div>', {
        //         id: 'heroHP',
        //         class: 'heroUI',
        //         // text: this.hitpoints
        //     }
        // );
        $(heroUI).append(nameDiv);
        this.domElem.append(heroUI);
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
        if (this.xPos * this.speed >= 0 && this.xPos * this.speed <= 1392){
            this.xPos += this.horizontalMove;
            // console.log('xpos * spis : ',this.xPos * this.speed);
            //Make sure he doesnt get stuck on edges
            if(this.xPos * this.speed < 0){
                this.xPos = 0;
            }if(this.xPos * this.speed > 1392){
                this.xPos = (1392 / this.speed);
            }
        }
        if (this.yPos * this.speed >= 0 && this.yPos * this.speed <= 848){
            this.yPos += this.verticalMove;

            //Make sure he doesnt get stuck on edges
            if(this.yPos * this.speed < 0){
                this.yPos = 0;
            }if(this.yPos * this.speed > 848){
                this.yPos = (848 / this.speed);
            }

        }
        // console.log('x is : ', this.xPos + ' and y is : ', this.yPos);
        this.domElem.css({
            top: (this.yPos * this.speed) + 'px',
            left: (this.xPos * this.speed) + 'px'
        });
    };

    // SKILLS
    this.shieldReady = true;
    this.shieldCooldown = 10000;

    this.shield = function(){
        if (this.shieldReady){
            this.shieldElem = $('<div>', {
                id: 'shieldElem'
            });
            this.domElem.append(this.shieldElem);
            this.shieldReady = false;
            setTimeout(function(){
                $('#shieldElem').remove();
            }, 3000);
            setTimeout(function(){
                self.shieldReady = true;
            }, this.shieldCooldown)
        }

    };
}
