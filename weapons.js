/**
 * Created by Bill on 1/20/17.
 */


function Weapon(parent, name){
    var self = this;
    this.parent = parent;
    this.name = name;
    this.xPos = game.heroObj.xPos + game.heroObj.width/2;
    this.yPos = game.heroObj.yPos + game.heroObj.height/2;
    this.size = 12;
    this.speed = 3;


    this.init = function () {
        var rockElem = this.createRockElem();
        this.startHeartbeat();
        return rockElem;
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


        console.log('Finding a rock');
        // console.log('rock length is : ', self.len);
        // console.log('xTraj : ', self.xTraj, 'yTraj : ', self.yTraj)
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

    this.move = function(){
        this.xPos += this.velocityX;
        this.yPos += this.velocityY;

        this.rockElem.css({
            left: this.xPos + 'px',
            top: this.yPos + 'px'
     })
    }
}

