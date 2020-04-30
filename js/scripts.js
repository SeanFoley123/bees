
var puzzle_details = {};
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    puzzle_details = json;
    console.log(puzzle_details.official_letters);
    console.log(json);
});


function check_word_and_submit(word) {
    if (puzzle_details.official_words.includes(word.toLowerCase())) {
        console.log(word);
    }
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
        check_word_and_submit($('.letters_entered').text())
    }
    else if (event.which == '8') {
        $('.letters_entered').text($('.letters_entered').text().slice(0, -1))
    }
})