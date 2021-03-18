const gameState = {
    p1Name: '',
    p2Name: '',
    currentPlayer: 'x',
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}
const computer = "o";
const userChoice = confirm("Are you playing with computer or friend ? If palying with friend write names else hit cancel")
if (userChoice) {
    const player1 = prompt("what is the player1 name?")
    $("#p1").text(player1)
    gameState.p1Name = player1;
    const player2 = prompt("what is the player2 name?")
    $("#p2").text(player2)
    gameState.p2Name = player2;
} else {
    const player1 = prompt("what is the player1 name?")
    $("#p1").text(player1)
    gameState.p1Name = player1;
    $("#p2").text('computer')
    gameState.p2Name = 'computer';
}

function checkWinner(player) {
    if ($(".row-1 .cell." + player).length === 3 ||
        $(".row-2 .cell." + player).length === 3 ||
        $(".row-3 .cell." + player).length === 3 ||
        $(".col1." + player).length === 3 ||
        $(".col2." + player).length === 3 ||
        $(".col3." + player).length === 3 ||
        ($("#1").hasClass(player) &&
            $("#5").hasClass(player) &&
            $("#9").hasClass(player)) ||
        ($("#3").hasClass(player) &&
            $("#5").hasClass(player) &&
            $("#7").hasClass(player))) {
        $(".cell ").empty();
        $(".cell").removeClass("x");
        $(".cell").removeClass("o");
        $(".cell").css('background', 'blue')
        return true;
    }
}

$('.cell').click(function() {
    if (gameState.currentPlayer === 'x' && !$(this).hasClass("o")) {
        console.log(gameState.currentPlayer)
        $(this).text("x")
        $(this).addClass("x")
        changePlayer()
        if (checkWinner("x")) {
            alert(`${gameState.p1Name}is the winner!.Start a new game`)
        } else checkTie()

    } else if (gameState.currentPlayer === 'o' && !$(this).hasClass("x")) {
        console.log(gameState.currentPlayer)
        $(this).text("o")
        $(this).addClass("o")
        changePlayer()
        if (checkWinner("o")) {
            alert(`${gameState.p2Name}is the winner!. Start a new game`)
        } else checkTie()
    }
});

function changePlayer() {
    if (gameState.currentPlayer == 'x') {
        gameState.currentPlayer = 'o'
    } else {
        gameState.currentPlayer = 'x'
    };
};

function checkTie() {
    if ($(".x").length + $(".o").length === 9) {
        $(".cell ").empty();
        $(".x").removeClass("x");
        $(".o").removeClass("o");
        alert("Its a tie")

    };
};

$('.restart').click(function() {
    $(".cell ").empty();
    $(".cell").removeClass("x");
    $(".cell").removeClass("o");
    $(".cell").css('background', 'blue')
});