let fields = [
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null
];

let currentPlayer = 'X';

function init(){
    render();
}
    
function render() {
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechnung des Index
            const cellContent = fields[index] !== null ? `<span class="${fields[index]}">${fields[index]}</span>` : '';
            html += `<td onclick="cellClicked(${index})">${cellContent}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

function cellClicked(index) {
    // Überprüfen, ob das Feld bereits besetzt ist
    if (fields[index] === null) {
        fields[index] = currentPlayer; // Setze das aktuelle Symbol
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Wechsel den Spieler
        render(); // Board aktualisieren
    }
}

// Initialisiere das Board
init();