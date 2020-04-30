
var puzzle_details = {};
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    puzzle_details = json;
    console.log(puzzle_details.official_letters);
    console.log(json);
});


function check_word_and_submit(word) {
    console.log(puzzle_details.official_words.includes(word));
}

$('body').keydown(function(event){
    var key_pressed = String.fromCharCode(event.which);
    if (key_pressed.match(/[a-z]/i)) {
        if (puzzle_details.official_letters.includes(key_pressed.toLowerCase())) {
            console.log(key_pressed);
            $('.letters_entered').append(key_pressed.toUpperCase());
        }
    }
    else if (event.which == '13') {

    }
})