document.addEventListener("DOMContentLoaded", () => {
    loadData();
    updateHealth();
});

function saveData() {
    const data = {
        characterName: document.getElementById("character-name").value,
        healthValue: document.getElementById("health-value").value,
        characterImage: document.getElementById("character-image").src,
        slots: [],
        stats: {
            strength: document.getElementById("strength").value,
            dexterity: document.getElementById("dexterity").value,
            intelligence: document.getElementById("intelligence").value,
            constitution: document.getElementById("constitution").value,
            appearance: document.getElementById("appearance").value,
            power: document.getElementById("power").value,
            size: document.getElementById("size").value,
            sanity: document.getElementById("sanity").value,
            education: document.getElementById("education").value,
            totalHealth: document.getElementById("total-health").value
        }
    };

    for (let i = 1; i <= 8; i++) {
        const slot = {
            img: document.getElementById(`img-${i}`).src,
            desc: document.getElementById(`desc-${i}`).value,
            ammo: document.getElementById(`ammo-${i}`).value
        };
        data.slots.push(slot);
    }

    localStorage.setItem("characterData", JSON.stringify(data));
    alert("Dados salvos com sucesso!");
}

function loadData() {
    const data = JSON.parse(localStorage.getItem("characterData"));

    if (data) {
        document.getElementById("character-name").value = data.characterName;
        document.getElementById("health-value").value = data.healthValue;
        document.getElementById("character-image").src = data.characterImage;

        for (let i = 1; i <= 8; i++) {
            const slot = data.slots[i - 1];
            document.getElementById(`img-${i}`).src = slot.img;
            document.getElementById(`desc-${i}`).value = slot.desc;
            document.getElementById(`ammo-${i}`).value = slot.ammo;
        }

        document.getElementById("strength").value = data.stats.strength;
        document.getElementById("dexterity").value = data.stats.dexterity;
        document.getElementById("intelligence").value = data.stats.intelligence;
        document.getElementById("constitution").value = data.stats.constitution;
        document.getElementById("appearance").value = data.stats.appearance;
        document.getElementById("power").value = data.stats.power;
        document.getElementById("size").value = data.stats.size;
        document.getElementById("sanity").value = data.stats.sanity;
        document.getElementById("education").value = data.stats.education;
        document.getElementById("total-health").value = data.stats.totalHealth;
    }
}

function updateHealth() {
    const healthValue = document.getElementById("health-value").value;
    const healthBar = document.getElementById("health-bar");
    healthBar.style.width = `${(healthValue / 20) * 100}%`;
}

function displayCharacterImage(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("character-image").src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function displayImage(input, slotNumber) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById(`img-${slotNumber}`).src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function editDescription(slotNumber) {
    const desc = document.getElementById(`desc-${slotNumber}`);
    desc.select();
}

function addItem(slotNumber) {
    document.getElementById(`file-${slotNumber}`).click();
}