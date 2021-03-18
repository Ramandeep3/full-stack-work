function makePalette() {
    const PALETTE = [
        'red',
        'blue',
        'green',
        'purple',
        'yellow'

    ];

    for (let index = 0; index < PALETTE.length; index = index + 1) {
        // access the color
        const nextColor = PALETTE[index]
        let btn = $('<button>');
        btn.css('background-color', nextColor);
        $('.palette').append(btn);
    }
    $('.palette button').first().addClass('active');

}
makePalette();

function makeGrid() {
    for (let i = 0; i < 64; i++) {
        let div = $('<div class="cell"></div>');
        $('.grid').append(div);
    }
}
makeGrid();

function onPaletteClick() {
    $('.palette button').removeClass('active');

    $(this).addClass('active');
}
$(".palette button").click(onPaletteClick);

function onGridClick() {
    let color = $(".palette.active").css('background-color')
    $(this).css('background-color', color)
}
$(".grid.cell ").click(onGridClick);

function onClearClick() {
    $(".grid.cell").css('background-color', '')
}
$(".controls.clear").click(onClearClick);

function onFillAllClick() {

    let color = $(".palette.active").css('background-color')
    $(this).css('background-color', color)

}
$(".controls.fill-all").click(onFillAllClick);


function onFillEmptyClick() {
    const elements = $('.cell')
    let color = $(".palette .active").css('background-color')
    for (let index = 0; index < elements.length; index = index + 1) {
        let nextElement = $(elements[index]);
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)') {
            nextElement.css('background-color', color);
        }

    }


}
$(".controls.fill-empty").click(onFillEmptyClick);