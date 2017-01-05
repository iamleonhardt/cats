/**
 * Created by Bill on 1/4/17.
 */


$(document).keydown('keypress', function (e) {
    console.log(e.which);

    switch (e.which) {
        case 38: //up
            $('#cat').addClass('up');
            break;
        case 37: //left
            $('#cat').addClass('left');
            break;
        case 40: // down
            $('#cat').addClass('down');
            break;
        case 39: // right
            $('#cat').addClass('right');
            break;
    }
});

$(document).keyup(function(){
    $('#cat').removeClass();
    $('#cat').addClass('stand');
});