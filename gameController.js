/**
 * Created by bill on 1/8/17.
 */

function GameController() {
    var self = this;
    this.controlsLeft = 37;
    this.controlsUp = 38;
    this.controlsRight = 39;
    this.controlsDown = 40;

    this.init = function (gameAreaSelector) {
        this.gameArea = $(gameAreaSelector);
        buildRandomMapArray();
        drawMap(randomizedMapArr);
        // this.createLoginBtn();
        this.createLoginElems();
        this.createHeroHUD();
        // this.makeHero();
    };

    this.createLoginElems = function(){
        this.domElem = $('<div>', {
            id: 'loginUI'

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
            id: 'loginBtn',
            text: 'Log in',
            class: 'loginBtn'
        });
        var createAcctBtn = $('<div>', {
            id: 'signUpBtn',
            text: 'Create Account',
            class: 'loginBtn'
        });
        var logoutBtn = $('<div>', {
            id: 'logoutBtn',
            text: 'Log out',
            class: 'loginBtn hide'
        })

        this.domElem.append(nameInput, emailInput, passInput, loginBtn, createAcctBtn, logoutBtn);
        $('#gameArea').append(this.domElem);
    };

    // this.createLoginBtn = function(){
    //     var googleLoginBtn = $('<div>', {
    //         id: 'loginBtn',
    //         text: 'login'
    //     });
    //     $('#gameArea').append(loginBtn);
    // }

    this.makeHero = function (name) {
        var hero = new Hero(this, name);
        this.heroObj = hero;
        var heroDomElem = this.heroObj.init();
        this.gameArea.append(heroDomElem);
    };

    this.createHeroHUD = function(){
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
            text: '10 hp',
            // class: 'heroHUD'
        });
        var heroLvlHUD = $('<div>', {
            id: 'heroLvlHUD',
            text: 'Level: 1',
            class: 'heroHUD'
        });
        // var hpBar = $('<div>', {
        //     id: 'hpBar'
        // });

        this.domElem.append(userNameHUD, heroHpHUD, heroLvlHUD);
        $('#gameArea').append(this.domElem);
    };

    this.handleKeypress = function (e) {
    console.log('e is : ', e.which);
        switch (e.which) {
            case self.controlsLeft:
                self.heroObj.horizontalMove = -1;
                self.heroObj.animationClass = 'left';
                break;

            case self.controlsUp:
                self.heroObj.verticalMove = -1;
                self.heroObj.animationClass = 'up';
                break;

            case self.controlsRight:
                self.heroObj.horizontalMove = 1;
                self.heroObj.animationClass = 'right';
                break;

            case self.controlsDown:
                self.heroObj.verticalMove = 1;
                self.heroObj.animationClass = 'down';
                break;

            case 27:
                $('#loginUI').toggleClass('hide');

            case 65:
                game.heroObj.shield();

        }
    };

    this.handleKeyup = function (e) {

        switch (e.which) {
            case self.controlsLeft:
                self.heroObj.horizontalMove = 0;
                break;

            case self.controlsUp:
                self.heroObj.verticalMove = 0;
                break;

            case self.controlsRight:
                self.heroObj.horizontalMove = 0;
                break;

            case self.controlsDown:
                self.heroObj.verticalMove = 0;
                break;
        }
    };

    this.addEventHandlers = function () {
        $(document).keydown(game.handleKeypress);
        $(document).keyup(game.handleKeyup);
    }
}