let fields = Array(9).fill(null);
let currentPlayer = 'X';
const contentElement = document.getElementById('content');
const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
const currentSymbolDisplay = document.getElementById('currentSymbolDisplay');
const winnerMessage = document.getElementById('winnerMessage');
const winnerSymbolDisplay = document.getElementById('winnerSymbolDisplay');

function init() {
    render();
}

function render() {
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const k = i * 3 + j;
            const cellContent = fields[k] !== null ? getSymbol(fields[k]) : '';
            html += `<td onclick="cellClicked(${k})">${cellContent}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    contentElement.innerHTML = html;
    if (!checkWinner() && fields.some(field => field === null)) {
        currentSymbolDisplay.innerHTML = getSymbol(currentPlayer);
    } else {
        currentPlayerDisplay.style.display = 'none';
    }
}

function getSymbol(player) {
    if (player === 'X') {
        return `
            <svg class="symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(254,192,0)">
                <path d="M4 4L20 20M20 4L4 20" stroke="rgb(254,192,0)" stroke-width="2" />
            </svg>`;
    } else if (player === 'O') {
        return `
            <svg class="symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(254,192,0)">
                <circle cx="12" cy="12" r="10" stroke="rgb(48,205,216)" stroke-width="2" fill="none"/>
            </svg>`;
    }
    return '';
}

function cellClicked(index) {
    if (fields[index] === null && !checkWinner()) {
        fields[index] = currentPlayer;
        if (checkWinner()) {
            winnerSymbolDisplay.innerHTML = getSymbol(currentPlayer); 
            winnerMessage.textContent = `hat gewonnen!`;
            setTimeout(resetGame, 5000); // Spiel nach 5 Sekunden zurücksetzen 
        } else if (fields.every(field => field !== null)) {
            winnerMessage.textContent = `Das Spiel endet unentschieden!`;
            currentPlayerDisplay.style.display = 'none';
            setTimeout(resetGame, 5000); // Spiel nach 5 Sekunden zurücksetzen
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        render();
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return fields[a] && fields[a] === fields[b] && fields[a] === fields[c];
    });
}
function resetGame() {
    fields.fill(null); // Felder zurücksetzen
    currentPlayer = 'X'; // Aktuellen Spieler zurücksetzen
    winnerMessage.textContent = ''; // Gewinnernachricht zurücksetzen
    winnerSymbolDisplay.innerHTML = ''; // Gewinner-Symbol zurücksetzen
    currentPlayerDisplay.style.display = 'block'; // Aktuellen Spieler wieder anzeigen
    init();
}
init();