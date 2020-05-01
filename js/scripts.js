
var puzzle_details = {};
var score = 0;
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    puzzle_details = json;
    console.log(puzzle_details.official_letters);
    console.log(json);
}).then(function() {
    console.log(puzzle_details);
    var outer_letters = puzzle_details.official_letters.slice();
    var index = outer_letters.indexOf(puzzle_details.central_letter_options[0]);
    if (index > -1) {
      outer_letters.splice(index, 1);
    }

    $('.label').each(function(i, element){
        $(this).text(outer_letters.pop().toUpperCase());
    })

    $('.center_label').text(puzzle_details.central_letter_options[0].toUpperCase());

    function check_word_and_submit(word) {
        if (puzzle_details.official_words.includes(word.toLowerCase())) {
            $('.word-list').append('<li>' + word.toUpperCase() + '</li>');
            if (word.length == 4){
                score += 1;
            }
            else {
                score += word.length;
                if (puzzle_details.pangrams.includes(word.toLowerCase())) {score += 7};
            }
            $('#score').text(score);
            if(score > puzzle_details.points_for_genius) {
                $('#score').addClass('so_smart')
            }
        }
        $('.letter').remove();
    }

    $('body').keydown(function(event){
        if (!event.ctrlKey) {
            var key_pressed = String.fromCharCode(event.which);
            var new_element = '';
            if (key_pressed.match(/[a-z]/i)) {
                if (puzzle_details.official_letters.includes(key_pressed.toLowerCase())) {
                    if (puzzle_details.central_letter_options.includes(key_pressed.toLowerCase())){
                        new_element += '<span class=\'letter central_letter\'>';
                    }
                    else {
                        new_element += '<span class=\'letter normal_letter\'>';
                    }
                }
                else {
                    new_element += '<span class=\'letter invalid_letter\'>';
                }
                new_element += key_pressed.toUpperCase();
                new_element += '</span>';
                $(new_element).insertBefore('.cursor');
            }
            else if (event.which == '13') {
                check_word_and_submit($('.letter').text())
            }
            else if (event.which == '8') {
                $('.letters_entered > .letter:last').remove();
            }
        }
    })
})