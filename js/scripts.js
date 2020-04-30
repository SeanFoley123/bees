
var puzzle_details = {};
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    console.log(json);
    puzzle_details = JSON.parse(json); // this will show the info it in firebug console
});

// fetch("saved_puzzles/offical_puzzle_2020-04-29.json")
//   .then(response => response.json())
//   .then(json => console.log(json));

// var puzzle_details = JSON.parse

$('body').keydown(function(event){
    var key_pressed = String.fromCharCode(event.which);
    if (key_pressed.match(/[a-z]/i)) {
        if (puzzle_details.official_letters.includes(key_pressed.toLowerCase())) {
            $('.letters_entered').innerHTML += key_pressed.toUpperCase();
        }
    }
})