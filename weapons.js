/**
 * Created by Bill on 1/20/17.
 */


function Weapon(parent, name, type){
    var self = this;
    this.parent = parent;
    this.rockElem = null;
    this.name = name;
    this.type = type;
    this.xPos = game.heroObj.xPos + game.heroObj.width/2;
    this.yPos = game.heroObj.yPos + game.heroObj.height/2;
    this.size = 12;
    this.speed = 3;
    this.startPoint = {x: 0, y: 0};
    this.throwDistance = 100;
    this.bulletLife = 1100;


    this.init = function () {
        this.rockElem = this.createRockElem();
        this.startHeartbeat();
        setTimeout(function(){
            self.die();
        }, self.bulletLife);
        return this.rockElem;

    };

    this.startHeartbeat = function () {
        this.heartbeat = setInterval(this.performHeartbeat, this.heartbeatInterval);
    };

    this.stopHeartbeat = function () {
        clearInterval(this.heartbeat);
    };

    this.performHeartbeat = function () {
            self.move();
    };


    this.createRockElem = function () {
        this.xTraj = game.cursorX - game.heroObj.xPos;
        this.yTraj = game.cursorY - game.heroObj.yPos;
        // console.log('IN WEAPONS cursorX is : ', game.cursorX, ' and cursorY is : ', game.cursorY);

        this.len = Math.sqrt(Math.pow(this.xTraj, 2) + Math.pow(this.yTraj,2));
        this.normalizedX = this.xTraj / this.len;
        this.normalizedY = this.yTraj / this.len;

        // console.log('Normalized x and y are : ', this.normalizedX, this.normalizedY);

        this.velocityX = this.normalizedX * this.speed;
        this.velocityY = this.normalizedY * this.speed;
        // console.log('Velocity  x and y are : ', this.velocityX, this.velocityY);

        this.rockElem = $('<div>', {
            class: 'rock',
            css: {
                top: this.yPos,
                left: this.xPos,
                height: this.size + 'px',
                width: this.size + 'px'
            }
        });
        return this.rockElem;
    };

    this.die = function(){
        $(this.rockElem).remove();
        this.stopHeartbeat();
    };

    this.move = function(){
        this.xPos += this.velocityX;
        this.yPos += this.velocityY;

        if (this.xPos < 0 || this.xPos > 1440 || this.yPos < 0 || this.yPos > 896){
            this.die();
            console.log('removing rock');
        }

        this.rockElem.css({
            left: this.xPos + 'px',
            top: this.yPos + 'px'
     })
    }
}

