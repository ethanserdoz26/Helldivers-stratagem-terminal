const stratagems = {
    "up,right,down,down,down": {
        name: "500KG BOMB",
        icon: "500kg-bomb.png"
    },

    "up,right,right": {
        name: "EAGLE STRAFING RUN",
        icon: "eagle-strafing-run.png"
    },

    "down,up,left,down,up,right,down,up": {
        name: "HELLBOMB",
        icon: "hellbomb.png"
    },

    "right,down,up,right,down": {
        name: "ORBITAL LASER",
        icon: "orbital-laser.png"
    },

    "up,down,right,left,up": {
        name: "REINFORCE",
        icon: "reinforce.png"
    }
};

let input = [];

// Play a new copy of the click for every button press
function playClick() {
    const sound = new Audio("stratagem-click.mp3");
    sound.play();
}

function enterArrow(direction) {

    playClick();

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
        <div class="result">
            <div class="received">REQUEST RECEIVED</div>
            <img class="stratagem-icon"
                 src="${stratagem.icon}"
                 alt="${stratagem.name}">
        </div>
    `;

    setTimeout(() => {
        input = [];
        createButtons();
    }, 3000);
}

function createButtons() {
    const terminal = document.getElementById("terminal");

    terminal.innerHTML = `
        <div class="arrows">
            <button type="button" data-direction="up">⬆</button>
            <button type="button" data-direction="left">⬅</button>
            <button type="button" data-direction="down">⬇</button>
            <button type="button" data-direction="right">➡</button>
        </div>
    `;

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("touchend", function(event) {
            event.preventDefault();

            const direction = button.dataset.direction;
            enterArrow(direction);
        }, { passive: false });

        button.addEventListener("click", function(event) {
            event.preventDefault();

            const direction = button.dataset.direction;
            enterArrow(direction);
        });

    });
}

createButtons();
