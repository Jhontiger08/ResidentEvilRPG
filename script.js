// Função para adicionar um item ao slot
function addItem(slot) {
    document.getElementById(`file-${slot}`).click();
}

// Função para exibir a imagem selecionada
function displayImage(input, slot) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById(`img-${slot}`).src = e.target.result;
        document.getElementById(`desc-${slot}`).textContent = 'Examinar Item';
        saveData();
    };

    reader.readAsDataURL(file);
}

// Função para editar a descrição do item
function editDescription(slot) {
    const description = prompt('Examine o item:');
    if (description !== null) {
        document.getElementById(`desc-${slot}`).textContent = description;
        saveData();
    }
}

// Função para mostrar detalhes do item
function showItemDetails(slot) {
    const description = document.getElementById(`desc-${slot}`).textContent;
    document.getElementById('item-details').textContent = description;
}

// Função para exibir a imagem do personagem
function displayCharacterImage(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('character-image').src = e.target.result;
        saveData();
    };

    reader.readAsDataURL(file);
}

// Função para atualizar a saúde do personagem
function updateHealth() {
    const healthValue = document.getElementById('health-value').value;
    const healthBar = document.getElementById('health-bar');
    healthBar.style.width = `${healthValue * 10}px`;

    if (healthValue >= 7) {
        healthBar.style.backgroundColor = 'green';
    } else if (healthValue >= 3) {
        healthBar.style.backgroundColor = 'orange';
    } else {
        healthBar.style.backgroundColor = 'red';
    }
    saveData();
}

// Função para calcular e atualizar os pontos de vida
function updateHP() {
    const con = parseInt(document.getElementById('con').value) || 0;
    const tam = parseInt(document.getElementById('tam').value) || 0;
    const totalHP = Math.ceil((con + tam) / 2);
    document.getElementById('total-hp').value = totalHP;
    document.getElementById('health-value').value = totalHP;
    updateHealth();
    saveData();
}

// Função para salvar dados no localStorage
function saveData() {
    const data = {
        items: [],
        characterImage: document.getElementById('character-image').src,
        healthValue: document.getElementById('health-value').value,
        con: document.getElementById('con').value,
        tam: document.getElementById('tam').value,
        totalHP: document.getElementById('total-hp').value
    };

    document.querySelectorAll('.item-slot').forEach((slot, index) => {
        const imgSrc = document.getElementById(`img-${index + 1}`).src;
        const desc = document.getElementById(`desc-${index + 1}`).textContent;
        data.items.push({ imgSrc, desc });
    });

    localStorage.setItem('gameData', JSON.stringify(data));
}

// Função para carregar dados do localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('gameData'));
    if (data) {
        document.getElementById('character-image').src = data.characterImage;
        document.getElementById('health-value').value = data.healthValue;
        document.getElementById('con').value = data.con;
        document.getElementById('tam').value = data.tam;
        document.getElementById('total-hp').value = data.totalHP;
        updateHealth();

        data.items.forEach((item, index) => {
            document.getElementById(`img-${index + 1}`).src = item.imgSrc;
            document.getElementById(`desc-${index + 1}`).textContent = item.desc;
        });
    }
}

// Adicionando evento para carregar os dados quando a página for carregada
window.onload = function() {
    loadData();
};

// Adicione event listeners para mostrar detalhes ao clicar em um slot
document.querySelectorAll('.item-slot').forEach(slot => {
    slot.addEventListener('click', (event) => {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {  // Evitar ação ao clicar no campo de munição ou textarea
            const slotId = slot.querySelector('input[type="file"]').id.replace('file-', '');
            showItemDetails(slotId);
        }
    });
});

// Adicionar botão para salvar manualmente os dados
const saveButton = document.createElement('button');
saveButton.textContent = 'Salvar Dados';
saveButton.onclick = saveData;
document.body.appendChild(saveButton);
