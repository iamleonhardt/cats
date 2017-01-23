/**
 * Created by bill on 1/8/17.
 */

function Hero(parent, name) {
    var self = this;
    this.parent = parent;
    this.domElem = null;
    this.heroSprite = 'hero1 ';
    this.name = name;
    this.hitpoints = 10;
    this.speed = 5;
    this.immune = false;

    this.heartbeatInterval = 15;
    this.animationClass = '';
    this.horizontalTraj = 0;
    this.verticalTraj = 0;
    this.width = 48;
    this.height = 48;
    this.xPos = (game.width / 2) - this.width / 2;
    this.yPos = (game.height / 2) - this.height / 2;

    // Skill Properties
    this.hasRock = false;
    this.throwReady = true;
    this.throwCooldown = 1000;
    this.quickThrowReady = true;
    this.quickThrowCooldown = 4000;
    this.shieldReady = true;
    this.shieldCooldown = 10000;


    this.init = function () {
        var domElem = this.createDomElem();
        this.startHeartbeat();
        return domElem;
    };

    this.createDomElem = function () {
        this.domElem = $('<div>', {
                id: 'hero',
                class: this.heroSprite + 'stand',
                css: {
                    top: self.yPos,
                    left: self.xPos,
                    width: this.width + 'px',
                    height: this.height + 'px'
                }
            }
        );
        var heroUI = $('<div>', {
                id: 'heroUI'
            }
        );
        var nameDiv = $('<div>', {
                id: 'heroName',
                class: 'heroUI',
                text: this.name
            }
        );
        var chatBubble = $('<div>', {
            class: 'chatBubble hide',
            text: 'Hello!'
        });

        $(heroUI).append(nameDiv, chatBubble);
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
        if (self.horizontalTraj == 0 && self.verticalTraj == 0) {
            self.standStill();
        } else {
            self.move();
        }
    };

    // MOVEMENT
    this.standStill = function () {
        self.domElem.attr('class', this.heroSprite + 'stand');
        this.animationClass = this.heroSprite + 'stand';
    };

    this.move = function () {
        // Set Sprite Animation
        this.domElem.attr('class', this.heroSprite + this.animationClass);

        // X Movement
        this.xPos += this.horizontalTraj * this.speed;

        // X collision
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.xPos > game.width - self.width) {
            this.xPos = (game.width - self.width);
        }

        // Y Movement
        this.yPos += this.verticalTraj * this.speed;

        // Y Collision
        if (this.yPos < 0) {
            this.yPos = 0;
        }
        if (this.yPos > game.height - self.height) {
            this.yPos = (game.height - self.height);
        }

        // Move sprite through css based on above x and y pos
        this.domElem.css({
            top: (this.yPos) + 'px',
            left: (this.xPos) + 'px'
        });
    };

    this.getRanNum = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // SKILLS

    // Emote
    this.ranEmote = function () {
        var chatBub = $('.chatBubble');
        this.emoteArr = ['Wow!', 'Much excite!', 'Incredible!', 'Savage!', 'So good!', 'Wrecked'];
        var ranNum = this.getRanNum(0, this.emoteArr.length - 1);
        var ranEmote = this.emoteArr[ranNum];
        console.log('ranEmote is : ', ranEmote);
        chatBub.toggleClass('hide');
        chatBub.text(ranEmote);
        setTimeout(function () {
            chatBub.toggleClass('hide');
        }, 1500);
    };

    // Get Rock
    this.getRock = function () {
        console.log(this.name + ' picks up a rock');
        this.hasRock = true;
    };

    // Throw Skill
    this.throw = function () {
        this.chatBub = $('.chatBubble');

        if (this.throwReady && this.hasRock) {
            var throwSound = new Audio('sounds/throw.mp3');
            throwSound.play();
            console.log(this.name + ' throws a rock.');
            game.makeWeapon('rock', 'rock');
            this.hasRock = false;
            this.throwReady = false;
            setTimeout(function () {
                self.throwReady = true;
            }, 1000);
        } else if (this.hasRock == false) {
            this.chatBub.toggleClass('hide');
            this.chatBub.text('I need a rock..');
            setTimeout(function () {
                self.chatBub.toggleClass('hide');
            }, 1500);
        }
    };

    // Quick Throw Skill
    this.quickThrow = function () {
        if (this.quickThrowReady) {
            var throwSound = new Audio('sounds/throw.mp3');
            throwSound.play();
            game.makeWeapon('rock', 'rock2');

            this.quickThrowReady = false;

            // Count for Quick Throw cooldown
            setTimeout(function () {
                self.quickThrowReady = true;
            }, this.quickThrowCooldown);
        }
    };

    // Shield Skill
    this.shield = function () {
        if (this.shieldReady) {
            self.immune = true;
            this.shieldElem = $('<div>', {
                id: 'shieldElem'
            });
            this.domElem.append(this.shieldElem);

            this.shieldReady = false;
            // Count for Shield active
            setTimeout(function () {
                $('#shieldElem').remove();
                self.immune = false;
            }, 3000);
            // Count for Shield cooldown
            setTimeout(function () {
                self.shieldReady = true;
            }, this.shieldCooldown)
        }
    };
}