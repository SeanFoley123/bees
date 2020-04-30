
var puzzle_details = {};
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    puzzle_details = json;
    console.log(puzzle_details.official_letters);
    console.log(json);
});


function check_word_and_submit(word) {
    if (puzzle_details.official_words.includes(word.toLowerCase())) {
        console.log(word);
        $('.word-list').append('<li>' + word.toUpperCase() + '</li>');
    }
    $('.letters_entered').text('');
}

$('body').keydown(function(event){
    var key_pressed = String.fromCharCode(event.which);
    if (key_pressed.match(/[a-z]/i)) {
        if (puzzle_details.official_letters.includes(key_pressed.toLowerCase())) {
            if (puzzle_details.central_letter_options.includes(key_pressed)){
                $('.letters_entered').append('<span class=\'central_letter\'>')
            }
            else {
                $('.letters_entered').append('<span class=\'normal_letter\'>')
            }
        }
        else {
            $('.letters_entered').append('<span class=\'invalid_letter\'>')
        }
        $('.letters_entered').append(key_pressed.toUpperCase() + '</span>')
    }
    else if (event.which == '13') {
        check_word_and_submit($('.letters_entered').text())
    }
    else if (event.which == '8') {
        $('.letters_entered:last_child').remove();
    }
})