
var array = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var user_clicked = [];
var count = -1;
var level = 1;
var started = 0;
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = 1;
    }
});
function nextSequence() {
    $("h1").text("level " + level);
    var random_number = Math.floor(Math.random() * 4);
    var temp = array[random_number];
    gamepattern.push(temp);

    $("#" + temp).addClass("pressed");
    setTimeout(function () {
        $("#" + temp).removeClass("pressed");
    }, 100);

    playsound(temp);
}

$(".btn").click(function () {

    var u_color = $(this).attr("id");
    user_clicked.push(u_color);

    playsound(u_color);

    $("#" + u_color).addClass("pressed");
    setTimeout(function () {
        $("#" + u_color).removeClass("pressed");
    }, 100);

    check(++count);

});

function check(count_to) {
    if (gamepattern[count_to] == user_clicked[count_to]) {
        if (user_clicked.length == gamepattern.length) {
            user_clicked=[];
            setTimeout(function () {
                count = -1;
                nextSequence();
            }, 1000);
        }
    }

    else {
        var last_sound = new Audio("sounds/wrong.mp3");
        last_sound.play();
        $(".container").addClass("game-over");
        setTimeout(function () {
            $(".container").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function playsound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function startOver() {
    started = false;
    user_clicked=[];
    level = 1;
    gamepattern=[];
    count=-1;

}

