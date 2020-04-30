
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
    if (!event.ctrlKey) {
        var key_pressed = String.fromCharCode(event.which);
        var new_element = '';
        if (key_pressed.match(/[a-z]/i)) {
            if (puzzle_details.official_letters.includes(key_pressed.toLowerCase())) {
                if (puzzle_details.central_letter_options.includes(key_pressed.toLowerCase())){
                    new_element += '<span class=\'central_letter\'>';
                }
                else {
                    new_element += '<span class=\'normal_letter\'>';
                }
            }
            else {
                new_element += '<span class=\'invalid_letter\'>';
            }
            new_element += key_pressed.toUpperCase();
            new_element += '</span>';
            console.log(new_element);
            $('.letters_entered').append(new_element);
        }
        else if (event.which == '13') {
            check_word_and_submit($('.letters_entered').text())
        }
        else if (event.which == '8') {
        }
    }
})