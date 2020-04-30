
$.getJSON("saved_puzzles/offical_puzzle_2020-04-29.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});

// fetch("saved_puzzles/offical_puzzle_2020-04-29.json")
//   .then(response => response.json())
//   .then(json => console.log(json));

// var puzzle_details = JSON.parse

$('body').keydown(function(event){
    var key_pressed = String.fromCharCode(event.which);
    if (key_pressed.match(/[a-z]/i)) {
        console.log(key_pressed.toUpperCase());
    }
})