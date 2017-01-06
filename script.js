/**
 * Created by Bill on 1/4/17.
 */
var catLeft = 0;
var catTop = 0;
var speed = 8;



$(document).keydown(move);

function move(e) {
    console.log(e.which);

    switch (e.which) {
        case 37: //left
            $('#cat').addClass('left');
            catLeft -= 1;
            console.log('cat is : ', cat);
            console.log('cat.style is : ', cat.style);
            cat.style.left = (catLeft * speed) + 'px';
            break;

        case 38: //up
            $('#cat').addClass('up');
            catTop -= 1;
            cat.style.top = (catTop * speed) + 'px';
            break;

        case 39: // right
            $('#cat').addClass('right');
            catLeft++;
            cat.style.left = (catLeft * speed) + 'px';
            break;

        case 40: // down
            $('#cat').addClass('down');
            catTop++;
            cat.style.top = (catTop * speed) + 'px';
            break;
    }
};

$(document).keyup(function(){
    $('#cat').removeClass();
    $('#cat').addClass('stand');
});