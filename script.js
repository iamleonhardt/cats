/**
 * Created by Bill on 1/4/17.
 */

var game;

$(document).ready(function () {
    game = new GameController();
    game.init('#gameArea');
    game.addEventHandlers();
});

