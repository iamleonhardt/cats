/**
 * Created by Bill on 1/20/17.
 */


function Weapon(parent, name){
    this.parent = parent;
    this.name = name;

    this.init = function () {
        console.log('weapon init fired');
        var rockElem = this.createRockElem();
        // this.startHeartbeat();
        return rockElem;
    };

    this.createRockElem = function () {
        console.log('Finding a rock');
        this.rockElem = $('<div>', {
            class: 'rock',
            css: {
                top: game.heroObj.yPos,
                left: game.heroObj.xPos
            }
        })
        return this.rockElem;
    };


}

