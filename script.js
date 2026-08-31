const stratagems = {
    "up,right,down,down,down": {
        name: "500KG BOMB",
        icon: "500kg-bomb.png"
    }
};

let input = [];

function enterArrow(direction) {
    input.push(direction);

    const code = input.join(",");

    if (stratagems[code]) {
        showRequest(stratagems[code]);
        return;
    }

    const possible = Object.keys(stratagems).some(key =>
        key.startsWith(code)
    );

    if (!possible) {
        input = [];
    }
}

function showRequest(stratagem) {
    document.getElementById("terminal").innerHTML = `
        <div>
            <div class="received">REQUEST RECEIVED</div>
            <img class="stratagem-icon"
                 src="${stratagem.icon}"
                 alt="${stratagem.name}">
        </div>
    `;

    setTimeout(() => {
        input = [];

        document.getElementById("terminal").innerHTML = `
            <div class="arrows">
                <button onclick="enterArrow('up')">↑</button>
                <button onclick="enterArrow('left')">←</button>
                <button onclick="enterArrow('down')">↓</button>
                <button onclick="enterArrow('right')">→</button>
            </div>
        `;
    }, 3000);
}
