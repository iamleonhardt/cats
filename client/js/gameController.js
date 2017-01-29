/**
 * Created by bill on 1/8/17.
 */

function GameController() {
    var self = this;
    this.controlsUp = 87;
    this.controlsRight = 68;
    this.controlsDown = 83;
    this.controlsLeft = 65;
    this.controlsShield = 49;
    this.controlsDig = 71;
    this.controlsEmote = 86;
    this.width = 1440;
    this.height = 900;
    this.herosArr = [];
    this.bulletArr = [];

    this.cursorX = 0;
    this.cursorY = 0;

    this.init = function (gameAreaSelector) {
        this.gameArea = $(gameAreaSelector);
        buildRandomMapArray();
        drawMap(randomizedMapArr);
        this.createLoginElems();
        this.createSettingsMenuElems();
        this.createHeroHUD();
        this.makeHero('Dummy', 500, 500);
    };

    this.createLoginElems = function () {
        this.domElem = $('<div>', {
            id: 'loginUI'
        });
        var emailInput = $('<input>', {
            id: 'emailInput',
            placeholder: 'Email'
        });
        var passInput = $('<input>', {
            id: 'passInput',
            placeholder: 'Password',
            type: 'password'
        });
        var loginBtn = $('<div>', {
            id: 'loginBtn',
            text: 'Log in',
            class: 'loginBtn'
        });
        var signUpBtn = $('<p>', {
            id: 'signUpRedirect',
            text: 'Create Account'
        });

        this.domElem.append(emailInput, passInput, loginBtn, signUpBtn);
        $('#gameArea').append(this.domElem);
        $('#signUpRedirect').click(function(){
            $('#loginUI').remove();
            self.createSignUpElems();
        });
    };

    this.createSignUpElems = function () {
        this.domElem = $('<div>', {
            id: 'signUpUI'
        });
        var nameInput = $('<input>', {
            id: 'nameInput',
            placeholder: 'Username'
        });
        var emailInput = $('<input>', {
            id: 'emailInput',
            placeholder: 'Email'
        });
        var passInput = $('<input>', {
            id: 'passInput',
            placeholder: 'Password',
            type: 'password'
        });
        var loginBtn = $('<div>', {
            id: 'signUpBtn',
            text: 'Create Account and Log In',
            class: 'loginBtn'
        });
        var signUpBtn = $('<p>', {
            id: 'cancelBtn',
            text: 'Cancel'
        });

        this.domElem.append(nameInput, emailInput, passInput, loginBtn, signUpBtn);
        $('#gameArea').append(this.domElem);
        $('#cancelBtn').click(function(){
            $('#signUpUI').remove();
            self.createLoginElems();
        })
    };

    this.createSettingsMenuElems = function(){
        this.domElem = $('<div>', {
            id: 'settingsUI',
            class: 'hide',
            text: 'Settings'
        });
        // Controls
        // move up
        var upInput = $('<input>', {
            id: 'upInput',
            class: 'controls',
            placeholder: 'move up : ' + String.fromCharCode(self.controlsUp)
        })
        // right
        var rightInput = $('<input>', {
            id: 'rightInput',
            class: 'controls',
            placeholder: 'move right : ' + String.fromCharCode(self.controlsRight)
        })
        // down
        var downInput = $('<input>', {
            id: 'downInput',
            class: 'controls',
            placeholder: 'move down : ' + String.fromCharCode(self.controlsDown)
        })
        // left
        var leftInput = $('<input>', {
            id: 'leftInput',
            class: 'controls',
            placeholder: 'move left : ' + String.fromCharCode(self.controlsLeft)
        })
        // shield
        var shieldInput = $('<input>', {
            id: 'shieldInput',
            class: 'controls',
            placeholder: 'shield : ' + String.fromCharCode(self.controlsShield)
        })
        // dig
        var digInput = $('<input>', {
            id: 'digInput',
            class: 'controls',
            placeholder: 'find rock : ' + String.fromCharCode(self.controlsDig)
        })
        //emote
        var emoteInput = $('<input>', {
            id: 'emoteInput',
            class: 'controls',
            placeholder: 'emote : ' + String.fromCharCode(self.controlsEmote)
        })



        var logoutBtn = $('<div>', {
            id: 'logoutBtn',
            text: 'Log out',
            class: 'loginBtn'
        });
        this.domElem.append(upInput, rightInput, downInput, leftInput, shieldInput, digInput, emoteInput, logoutBtn);
        $('#gameArea').append(this.domElem);
    }

    this.intersects = function(a, b){
        return a.xPos < b.xPos + b.width && a.xPos + a.width > b.xPos && a.yPos < b.yPos + b.height  && a.yPos + a.height > b.yPos;
    }

    this.checkCollisions = function(whoToCheck){
        for(var i = 0; i < self.herosArr.length; i++){
            if(self.herosArr[i].name != whoToCheck.name){
                if(self.intersects(whoToCheck, self.herosArr[i])){
                    console.log('collision!!BBQ');
                    return self.herosArr[i];
                    // return true;
                    // console.log('I am ' + self.name + ' and ' + game.herosArr[i].name + ' collided into me');
                }
            }
        }
    };

    this.makeHero = function (name, x, y) {
        var hero = new Hero(this, name, x, y);
        this.herosArr.push(hero);
        this.heroObj = hero;
        var heroDomElem = this.heroObj.init();
        this.gameArea.append(heroDomElem);
    };

    this.makeWeapon = function (owner, type) {
        var weapon = new Weapon(owner, type);
        this.weaponObj = weapon;
        var weaponDomElem = this.weaponObj.init();
        this.gameArea.append(weaponDomElem);
    };

    this.createHeroHUD = function () {
        this.domElem = $('<div>', {
            id: 'heroHUDContainer',
            class: 'hide'
        });
        var userNameHUD = $('<div>', {
            id: 'userNameHUD',
            text: '',
            class: 'heroHUD'
        });
        var heroHpHUD = $('<div>', {
            id: 'heroHpHUD',
            text: '10 hp'
        });
        var heroLvlHUD = $('<div>', {
            id: 'heroLvlHUD',
            text: 'Level: 1',
            class: 'heroHUD'
        });
        this.domElem.append(userNameHUD, heroHpHUD, heroLvlHUD);
        $('#gameArea').append(this.domElem);
    };

    this.handleMouseClicks = function (e) {
        switch (e.button) {
            case 0:
                // console.log('left mouse clicked');
                self.cursorX = e.clientX;
                self.cursorY = e.clientY;
                // console.log('cursorX is : ', self.cursorX + ' and cursorY is : ', self.cursorY);
                // game.makeRock();
                game.heroObj.throw();

                break;
            case 2:
                // console.log('right mouse clicked');
                self.cursorX = e.clientX;
                self.cursorY = e.clientY;
                // console.log('cursorX is : ', self.cursorX + ' and cursorY is : ', self.cursorY);
                game.heroObj.quickThrow();
                break;
        }
    };

    this.handleKeypress = function (e) {
        // console.log('e is : ', e.which);
        switch (e.which) {
            case self.controlsLeft: // move
                self.heroObj.horizontalTraj = -1;
                self.heroObj.animationClass = 'left';
                break;

            case self.controlsUp: // move
                self.heroObj.verticalTraj = -1;
                self.heroObj.animationClass = 'up';
                break;

            case self.controlsRight: // move
                self.heroObj.horizontalTraj = 1;
                self.heroObj.animationClass = 'right';
                break;

            case self.controlsDown: //move
                self.heroObj.verticalTraj = 1;
                self.heroObj.animationClass = 'down';
                break;

            case 27: // toggle Login
                $('#settingsUI').toggleClass('hide');
                break;

            case self.controlsShield: // shield
                game.heroObj.shield();
                break;

            case self.controlsDig: // get rock
                game.heroObj.getRock();
                break;
            case self.controlsEmote: // random emote
                game.heroObj.ranEmote();
            break;
        }
    };

    this.handleKeyup = function (e) {
        switch (e.which) {
            case self.controlsLeft:
                self.heroObj.horizontalTraj = 0;
                break;

            case self.controlsUp:
                self.heroObj.verticalTraj = 0;
                break;

            case self.controlsRight:
                self.heroObj.horizontalTraj = 0;
                break;

            case self.controlsDown:
                self.heroObj.verticalTraj = 0;
                break;
        }
    };

    this.addEventHandlers = function () {
        $(document).keydown(game.handleKeypress);
        $(document).keyup(game.handleKeyup);
        $(document).contextmenu(function () {
            return false;
        });
        $(document).mousedown(game.handleMouseClicks);
    }
}