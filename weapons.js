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
    this.bulletLife = 600;

    this.init = function () {
        this.rockElem = this.createRockElem();
        this.startHeartbeat();
        // Start counter for bullet life
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
        // Determine direction from hero to cursor
        this.xTraj = game.cursorX  - this.xPos;
        this.yTraj = game.cursorY - this.yPos;

        // Normalize the unit length
        this.len = Math.sqrt(Math.pow(this.xTraj, 2) + Math.pow(this.yTraj,2));
        this.normalizedX = this.xTraj / this.len;
        this.normalizedY = this.yTraj / this.len;

        // Determine Velocity
        this.velocityX = this.normalizedX * this.speed;
        this.velocityY = this.normalizedY * this.speed;

        // Create Dom Elem
        this.rockElem = $('<div>', {
            class: self.type,
            css: {
                top: this.yPos,
                left: this.xPos,
                height: this.size + 'px',
                width: this.size + 'px'
            }
        });
        return this.rockElem;
    };

    // Removes the Dom elem and stops heartbeat to clear memory
    this.die = function(){
        $(this.rockElem).remove();
        this.stopHeartbeat();
    };

    this.move = function(){
        // Increment position by velocity every heartbeat
        this.xPos += this.velocityX;
        this.yPos += this.velocityY;

        // Remove bullet if out of game area
        if (this.xPos < 0 || this.xPos > game.width || this.yPos < 0 || this.yPos > game.height){
            this.die();
        }

        // Move bullet sprite by updating css
        this.rockElem.css({
            left: this.xPos + 'px',
            top: this.yPos + 'px'
     })
    }
}

